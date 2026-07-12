#!/usr/bin/env python3
"""
投稿CSVのセルフチェックツール（投稿はしない。読み取り専用）。

Usage:
  python scripts/check_posts.py path/to/posts.csv
  python scripts/check_posts.py --allow-placeholders path/to/posts.csv  # 下書き段階用

チェック内容:
  [ERROR]  投稿をブロックすべき問題（文字数超過・必須列欠け・ハッシュタグ・NGワード・本文内URL）
  [WARN]   投稿前に人間の確認が必要な問題（プレースホルダ残り・数字なし・異常文字）

Exit codes: 0 = 問題なし（WARNのみ含む場合は --allow-placeholders 時のみ0）, 1 = 要修正。
既存の post_tweet.py の文字数計算をそのまま利用する（本番と同じ判定）。
"""
from __future__ import annotations

import csv
import re
import sys
import unicodedata
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from post_tweet import TWEET_WEIGHT_LIMIT, tweet_weight, validate_post_text  # noqa: E402

REQUIRED_COLS = ("曜日", "時間", "本文")
URL_RE = re.compile(r"https?://\S+")
PLACEHOLDER_RE = re.compile(r"【[^】]*】")
DIGIT_RE = re.compile(r"[0-9０-９]")

# x_strategy_workle.md のNGルール（景表法・信頼確保）に対応
NG_WORDS = (
    "簡単に稼げる", "誰でもすぐ", "日本一", "最強", "No.1", "ナンバーワン",
    "必ず儲かる", "絶対に成功",
)

VALID_DAYS = ("月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日")


def find_weird_chars(text: str) -> list[str]:
    """日本語投稿に混ざりがちな異常文字（キリル文字・ハングル等）を検出する。"""
    weird = []
    for ch in text:
        if ch in "\n\r\t":
            continue
        try:
            name = unicodedata.name(ch)
        except ValueError:
            weird.append(repr(ch))
            continue
        if name.startswith(("CYRILLIC", "HANGUL", "ARABIC", "HEBREW", "THAI")):
            weird.append(f"{ch} ({name})")
    return weird


def check_row(row: dict, line_no: int, allow_placeholders: bool) -> tuple[list[str], list[str]]:
    """1行を検査して (errors, warnings) を返す。"""
    errors: list[str] = []
    warnings: list[str] = []
    prefix = f"{line_no}行目({row.get('曜日', '?')} {row.get('時間', '?')})"

    day = str(row.get("曜日", "")).strip()
    if day not in VALID_DAYS:
        errors.append(f"{prefix}: 曜日「{day}」が不正です（「月曜日」形式で書く）")
    time_str = str(row.get("時間", "")).strip()
    time_match = re.fullmatch(r"(\d{1,2}):(\d{2})", time_str)
    if not time_match or not (0 <= int(time_match.group(1)) <= 23
                              and 0 <= int(time_match.group(2)) <= 59):
        errors.append(
            f"{prefix}: 時間「{time_str}」が不正です（HH:MM形式・実在する時刻で書く。"
            f"不正な時刻はエラーにならず永遠に投稿されない行になる）"
        )

    for field_name, text in (("本文", str(row.get("本文", ""))),
                             ("セルフリプライ", str(row.get("セルフリプライ", "") or ""))):
        if field_name == "セルフリプライ" and not text.strip():
            continue
        loc = f"{prefix} {field_name}"

        for problem in validate_post_text(text):
            errors.append(f"{loc}: {problem}（現在の換算: {tweet_weight(text)}/{TWEET_WEIGHT_LIMIT}）")
        if "#" in text:
            errors.append(f"{loc}: ハッシュタグ禁止（戦略MDのNGルール）")
        for word in NG_WORDS:
            if word in text:
                errors.append(f"{loc}: NGワード「{word}」が含まれています（景表法リスク）")
        if field_name == "本文" and URL_RE.search(text):
            errors.append(f"{loc}: 本文にURLがあります。リンクはセルフリプライ欄に移すこと")

        placeholders = PLACEHOLDER_RE.findall(text)
        if placeholders:
            msg = f"{loc}: プレースホルダが残っています: {' '.join(placeholders[:3])}"
            if allow_placeholders:
                warnings.append(msg + "（下書きとしてはOK。予約前に必ず実数・実話に差し替え）")
            else:
                errors.append(msg + "（このまま投稿されると事故。実数・実話に差し替えるまで予約禁止）")

        weird = find_weird_chars(text)
        if weird:
            warnings.append(f"{loc}: 異常文字の混入疑い: {', '.join(weird[:5])}")

    body = str(row.get("本文", ""))
    if body.strip() and not DIGIT_RE.search(body) and not PLACEHOLDER_RE.search(body):
        warnings.append(f"{prefix}: 本文に数字がありません（戦略MD:「数字は必ず1つ以上」。意図的なら無視可）")

    return errors, warnings


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    allow_placeholders = "--allow-placeholders" in sys.argv
    if not args:
        print(__doc__)
        return 1

    csv_path = Path(args[0])
    if not csv_path.exists():
        print(f"[ERROR] ファイルが見つかりません: {csv_path}")
        return 1

    with open(csv_path, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fields = reader.fieldnames or []
        missing = [c for c in REQUIRED_COLS if c not in fields]
        if missing:
            print(f"[ERROR] 必須列がありません: {', '.join(missing)}（1行目の列名を確認）")
            return 1
        rows = list(reader)

    if not rows:
        print("[ERROR] データ行が0件です")
        return 1

    all_errors: list[str] = []
    all_warnings: list[str] = []
    for i, row in enumerate(rows):
        errors, warnings = check_row(row, i + 2, allow_placeholders)
        all_errors.extend(errors)
        all_warnings.extend(warnings)

    for msg in all_errors:
        print(f"[ERROR] {msg}")
    for msg in all_warnings:
        print(f"[WARN]  {msg}")

    print(f"\n{len(rows)}件チェック: ERROR {len(all_errors)} / WARN {len(all_warnings)}")
    if all_errors:
        print("→ ERRORをすべて解消するまで、この内容をシートに反映してはいけません。")
        return 1
    print("→ 機械チェックはOK。ただし『実数が事実か』『ペルソナの口調か』は人間/モデルが別途確認すること。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
