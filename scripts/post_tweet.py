#!/usr/bin/env python3
"""
Post scheduled tweets from Google Sheets (or CSV fallback).

Google Sheets mode (default):
  Env: GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_JSON
  Sheet columns: 投稿日付 (YYYY-MM-DD) | 時間 | 柱 | 構文 | 本文 | セルフリプライ | ステータス

CSV fallback (local testing):
  Usage: python scripts/post_tweet.py path/to/posts.csv
  CSV columns: 曜日 | 時間 | 柱 | 構文 | 本文 | セルフリプライ

Env:
  DRY_RUN=1  -> select and validate the post but do not call the X API
               and do not mark the sheet row as done.

Every run appends a human-readable summary to logs/post_summary.md
(and to GITHUB_STEP_SUMMARY when running on GitHub Actions).

Exit codes: 0 = posted / no post for this slot / dry run,
            1 = failure (see summary for cause).
"""
from __future__ import annotations

import csv
import json
import logging
import os
import re
import sys
import time
from datetime import datetime, timezone, timedelta

import requests
import tweepy

logger = logging.getLogger("post_tweet")

JST = timezone(timedelta(hours=9))

DAY_MAP = {
    0: "月曜日", 1: "火曜日", 2: "水曜日", 3: "木曜日",
    4: "金曜日", 5: "土曜日", 6: "日曜日",
}

DATE_COL = "投稿日付"
TIME_COL = "時間"
TEXT_COL = "本文"
REPLY_COL = "セルフリプライ"
STATUS_COL = "ステータス"
STATUS_DONE = "済み"

SLOT_TOLERANCE_MINUTES = 30

# GitHub Actions cron fires late (5h+ delays observed), so sheet rows stay
# eligible for hours after their scheduled time; the 済み mark prevents
# double-posting. CSV test mode keeps the strict ±30min window instead.
CATCH_UP_HOURS = 6

# X counts most CJK chars as 2 weight units, limit 280 (= 140 Japanese chars).
TWEET_WEIGHT_LIMIT = 280
URL_WEIGHT = 23
URL_RE = re.compile(r"https?://\S+")
LIGHT_WEIGHT_RANGES = (
    (0x0000, 0x10FF), (0x2000, 0x200D), (0x2010, 0x201F), (0x2032, 0x2037),
)

MAX_ATTEMPTS = 3
RETRY_DELAY_SECONDS = 20

SUMMARY_PATH = os.path.join("logs", "post_summary.md")
SUMMARY_HEADER = (
    "# X自動投稿 実行ログ\n"
    "\n"
    "毎回の実行結果が自動で記録されます。**最新の実行が一番上**です。\n"
    "\n"
    "<!-- entries -->\n"
)

NETWORK_ERRORS = (requests.exceptions.ConnectionError, requests.exceptions.Timeout)


class ConfigError(Exception):
    """Configuration problem the operator must fix (missing secret, bad JSON, ...)."""

    def __init__(self, message: str, hint: str):
        super().__init__(message)
        self.hint = hint


def now_jst() -> datetime:
    return datetime.now(JST)


def is_within_slot(row_time: str, now: datetime) -> bool:
    """Return True if now is within SLOT_TOLERANCE_MINUTES of the scheduled HH:MM."""
    try:
        h, m = map(int, str(row_time).strip().split(":"))
        scheduled = now.replace(hour=h, minute=m, second=0, microsecond=0)
    except (ValueError, AttributeError):
        return False
    diff_minutes = abs((now - scheduled).total_seconds()) / 60
    return diff_minutes <= SLOT_TOLERANCE_MINUTES


def tweet_weight(text: str) -> int:
    """Approximate X's weighted length: URLs count 23, CJK counts 2, ASCII 1."""
    weight = 0
    for part in URL_RE.split(text):
        for ch in part:
            cp = ord(ch)
            is_light = any(lo <= cp <= hi for lo, hi in LIGHT_WEIGHT_RANGES)
            weight += 1 if is_light else 2
    weight += URL_WEIGHT * len(URL_RE.findall(text))
    return weight


def validate_post_text(text: str) -> list[str]:
    """Return a list of problems (empty list = OK)."""
    problems = []
    if not text or not text.strip():
        problems.append("本文が空です")
        return problems
    weight = tweet_weight(text)
    if weight > TWEET_WEIGHT_LIMIT:
        problems.append(
            f"本文が長すぎます（換算 {weight}/{TWEET_WEIGHT_LIMIT}。"
            f"日本語はおよそ140字が上限です）"
        )
    return problems


def with_retries(action_name: str, fn, retriable: tuple = NETWORK_ERRORS,
                 attempts: int = MAX_ATTEMPTS, delay: float = RETRY_DELAY_SECONDS):
    """Run fn(); retry on transient errors with linear backoff."""
    for attempt in range(1, attempts + 1):
        try:
            return fn()
        except retriable as exc:
            if attempt == attempts:
                raise
            wait = delay * attempt
            logger.warning(
                "%s failed (attempt %d/%d): %s — retrying in %.0fs",
                action_name, attempt, attempts, exc, wait,
            )
            time.sleep(wait)


def is_due(row_time: str, now: datetime) -> bool:
    """Return True if the scheduled HH:MM has passed today, at most CATCH_UP_HOURS ago."""
    try:
        h, m = map(int, str(row_time).strip().split(":"))
        scheduled = now.replace(hour=h, minute=m, second=0, microsecond=0)
    except (ValueError, AttributeError):
        return False
    delay_hours = (now - scheduled).total_seconds() / 3600
    return 0 <= delay_hours <= CATCH_UP_HOURS


def select_row(records: list[dict], now: datetime) -> tuple[int, dict] | None:
    """Pick today's oldest not-yet-posted row whose time has come. Returns (index, row)."""
    today = now.strftime("%Y-%m-%d")
    for i, row in enumerate(records):
        date_match = str(row.get(DATE_COL, "")).strip() == today
        due = is_due(str(row.get(TIME_COL, "")), now)
        not_done = str(row.get(STATUS_COL, "")).strip() != STATUS_DONE
        if date_match and due and not_done:
            return i, row
    return None


def load_sheet(sheet_id: str):
    import gspread
    from google.oauth2.service_account import Credentials

    sa_json = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON")
    if not sa_json:
        raise ConfigError(
            "GOOGLE_SERVICE_ACCOUNT_JSON が設定されていません",
            "GitHubリポジトリの Settings → Secrets and variables → Actions を確認してください",
        )
    try:
        info = json.loads(sa_json)
    except json.JSONDecodeError as exc:
        raise ConfigError(
            f"GOOGLE_SERVICE_ACCOUNT_JSON がJSONとして読めません: {exc}",
            "サービスアカウントのJSONキーを丸ごと貼り直してください",
        ) from exc

    creds = Credentials.from_service_account_info(
        info, scopes=["https://www.googleapis.com/auth/spreadsheets"],
    )
    gc = gspread.authorize(creds)
    return with_retries("open sheet", lambda: gc.open_by_key(sheet_id).sheet1)


def fetch_records(sheet) -> list[dict]:
    return with_retries("read sheet", sheet.get_all_records)


def mark_done(sheet, records: list[dict], row_index: int) -> None:
    headers = list(records[0].keys())
    if STATUS_COL not in headers:
        raise ConfigError(
            f"シートに「{STATUS_COL}」列がありません",
            f"1行目に「{STATUS_COL}」という列を追加してください",
        )
    status_col_idx = headers.index(STATUS_COL) + 1  # gspread is 1-indexed
    row_num = row_index + 2  # +1 header row, +1 for 1-indexing
    with_retries(
        "mark done",
        lambda: sheet.update_cell(row_num, status_col_idx, STATUS_DONE),
    )


def find_post_from_csv(csv_path: str, now: datetime) -> dict | None:
    if not os.path.exists(csv_path):
        raise ConfigError(
            f"CSVファイルが見つかりません: {csv_path}",
            "ファイル名・パスを確認してください",
        )
    day = DAY_MAP[now.weekday()]
    with open(csv_path, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fields = reader.fieldnames or []
        for col in ("曜日", TIME_COL, TEXT_COL):
            if col not in fields:
                raise ConfigError(
                    f"CSVに「{col}」列がありません: {csv_path}",
                    "CSVの1行目（列名）を確認してください",
                )
        for row in reader:
            if row["曜日"] == day and is_within_slot(row[TIME_COL], now):
                return row
    return None


def build_client() -> tweepy.Client:
    required = ("X_API_KEY", "X_API_KEY_SECRET", "X_ACCESS_TOKEN", "X_ACCESS_TOKEN_SECRET")
    missing = [name for name in required if not os.environ.get(name)]
    if missing:
        raise ConfigError(
            f"X APIの認証情報が不足しています: {', '.join(missing)}",
            "GitHubリポジトリの Settings → Secrets and variables → Actions を確認してください",
        )
    return tweepy.Client(
        consumer_key=os.environ["X_API_KEY"],
        consumer_secret=os.environ["X_API_KEY_SECRET"],
        access_token=os.environ["X_ACCESS_TOKEN"],
        access_token_secret=os.environ["X_ACCESS_TOKEN_SECRET"],
    )


def send_tweet(client: tweepy.Client, text: str,
               in_reply_to: str | None = None) -> str | None:
    """Post one tweet with retries on rate limit / network errors.

    Returns the tweet id, or None when X reports the exact same text was
    already posted (can happen if a previous attempt succeeded but the
    response was lost).
    """
    retriable = (tweepy.TooManyRequests,) + NETWORK_ERRORS
    for attempt in range(1, MAX_ATTEMPTS + 1):
        try:
            response = client.create_tweet(text=text, in_reply_to_tweet_id=in_reply_to)
            return response.data["id"]
        except tweepy.Forbidden as exc:
            if attempt > 1 and "duplicate" in str(exc).lower():
                logger.warning("X reports duplicate content — assuming already posted.")
                return None
            raise
        except retriable as exc:
            if attempt == MAX_ATTEMPTS:
                raise
            wait = RETRY_DELAY_SECONDS * attempt
            logger.warning(
                "create_tweet failed (attempt %d/%d): %s — retrying in %.0fs",
                attempt, MAX_ATTEMPTS, exc, wait,
            )
            time.sleep(wait)
    return None


def describe_error(exc: Exception) -> tuple[str, str]:
    """Map an exception to (cause, hint) in operator-friendly Japanese."""
    if isinstance(exc, ConfigError):
        return str(exc), exc.hint
    if isinstance(exc, tweepy.TooManyRequests):
        return ("X APIのレート制限（回数制限）に達しました",
                "時間を置くと自動的に回復します。頻発する場合はX APIプランの上限を確認してください")
    if isinstance(exc, (tweepy.Unauthorized, tweepy.Forbidden)):
        return ("X APIの認証・権限エラー",
                "GitHub SecretsのX_API_KEYなど4つのキーが正しいか、Xアプリの権限がRead and Writeかを確認してください")
    if isinstance(exc, NETWORK_ERRORS):
        return ("ネットワークエラー（接続できませんでした）",
                "一時的な障害の可能性が高いです。GitHub Actionsから手動で再実行してください")
    try:
        import gspread
        if isinstance(exc, gspread.exceptions.APIError):
            return (f"Google Sheets APIエラー: {exc}",
                    "サービスアカウントにシートの編集権限があるか、シートIDが正しいかを確認してください")
        if isinstance(exc, gspread.exceptions.SpreadsheetNotFound):
            return ("スプレッドシートが見つかりません",
                    "GOOGLE_SHEET_ID と、サービスアカウントへの共有設定を確認してください")
    except ImportError:
        pass
    return (f"想定外のエラー: {type(exc).__name__}: {exc}",
            "GitHub Actionsのログ全文を確認してください")


def build_summary_entry(result: dict) -> str:
    status_labels = {
        "posted": "✅ 投稿成功",
        "no_post": "⏭ この時間帯の投稿なし",
        "dry_run": "🧪 ドライラン（投稿はしていません）",
        "error": "❌ 失敗",
        "partial": "⚠️ 一部失敗",
    }
    lines = [f"## {result['time']} — {status_labels[result['status']]}", ""]
    lines.append(f"- 参照元: {result['source']}")
    if result.get("tweet_url"):
        lines.append(f"- 投稿: {result['tweet_url']}")
    if result.get("reply"):
        lines.append(f"- セルフリプライ: {result['reply']}")
    if result.get("error"):
        lines.append(f"- 原因: {result['error']}")
    if result.get("hint"):
        lines.append(f"- 対処: {result['hint']}")
    for warning in result.get("warnings", []):
        lines.append(f"- 注意: {warning}")
    lines.append("")
    return "\n".join(lines)


def write_summary(entry: str, path: str = SUMMARY_PATH) -> None:
    """Prepend the entry to the summary file (newest first)."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            content = f.read()
        if "<!-- entries -->" not in content:
            content = SUMMARY_HEADER + content
    else:
        content = SUMMARY_HEADER
    head, _, tail = content.partition("<!-- entries -->\n")
    new_content = (head + "<!-- entries -->\n\n"
                   + entry.rstrip("\n") + "\n\n" + tail.lstrip("\n"))
    with open(path, "w", encoding="utf-8") as f:
        f.write(new_content)

    step_summary = os.environ.get("GITHUB_STEP_SUMMARY")
    if step_summary:
        with open(step_summary, "a", encoding="utf-8") as f:
            f.write(entry + "\n")


def run(now: datetime, csv_path: str | None, dry_run: bool) -> dict:
    """Execute one posting cycle and return a result dict (never raises for
    per-post problems; configuration/API errors propagate to main)."""
    result: dict = {
        "time": now.strftime("%Y-%m-%d %H:%M JST"),
        "status": "no_post",
        "source": "",
        "warnings": [],
    }

    sheet_id = os.environ.get("GOOGLE_SHEET_ID")
    sheet = None
    records: list[dict] = []
    row_index = -1

    if sheet_id and not csv_path:
        result["source"] = "Google Sheets"
        logger.info("Source: Google Sheets (%s...)", sheet_id[:6])
        sheet = load_sheet(sheet_id)
        records = fetch_records(sheet)
        selected = select_row(records, now)
        if selected:
            row_index, post = selected
        else:
            post = None
    else:
        path = csv_path or "x_posts_week1.csv"
        result["source"] = f"CSV ({path})"
        logger.info("Source: CSV (%s)", path)
        post = find_post_from_csv(path, now)

    if not post:
        logger.info("No post found for this slot.")
        return result

    text = str(post.get(TEXT_COL, ""))
    problems = validate_post_text(text)
    if problems:
        result["status"] = "error"
        result["error"] = "投稿できない本文です: " + " / ".join(problems)
        result["hint"] = "スプレッドシートの該当行の本文を修正してください（この行は未投稿のままです）"
        return result

    if dry_run:
        logger.info("DRY RUN — would post: %s", text[:50].replace("\n", " "))
        result["status"] = "dry_run"
        return result

    client = build_client()
    tweet_id = send_tweet(client, text)
    if tweet_id:
        result["tweet_url"] = f"https://x.com/i/web/status/{tweet_id}"
        logger.info("Posted: %s", result["tweet_url"])
    else:
        result["warnings"].append("同じ本文が投稿済みとXから報告されたため、投稿済み扱いにしました")
    result["status"] = "posted"

    if sheet is not None:
        try:
            mark_done(sheet, records, row_index)
        except Exception as exc:  # posted but could not mark — must not lose that fact
            logger.exception("Failed to mark row as done")
            cause, hint = describe_error(exc)
            result["status"] = "partial"
            result["warnings"].append(
                f"投稿は成功しましたが、シートの「{STATUS_DONE}」更新に失敗: {cause}。"
                f"手動で該当行のステータスを「{STATUS_DONE}」にしてください"
            )

    reply_text = str(post.get(REPLY_COL, "") or "").strip()
    if reply_text and tweet_id:
        reply_problems = validate_post_text(reply_text)
        if reply_problems:
            result["status"] = "partial"
            result["warnings"].append(
                "セルフリプライを飛ばしました: " + " / ".join(reply_problems)
            )
        else:
            try:
                send_tweet(client, reply_text, in_reply_to=tweet_id)
                result["reply"] = "投稿済み"
                logger.info("Self-reply posted.")
            except Exception as exc:
                logger.exception("Self-reply failed")
                cause, _ = describe_error(exc)
                result["status"] = "partial"
                result["warnings"].append(f"セルフリプライの投稿に失敗: {cause}")
    elif reply_text:
        result["reply"] = "飛ばしました（本編の重複判定のため）"

    return result


def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    now = now_jst()
    csv_path = sys.argv[1] if len(sys.argv) > 1 else None
    dry_run = os.environ.get("DRY_RUN", "").lower() in ("1", "true", "yes")

    try:
        result = run(now, csv_path, dry_run)
    except Exception as exc:
        logger.exception("Run failed")
        cause, hint = describe_error(exc)
        result = {
            "time": now.strftime("%Y-%m-%d %H:%M JST"),
            "status": "error",
            "source": "Google Sheets" if os.environ.get("GOOGLE_SHEET_ID") else "CSV",
            "error": cause,
            "hint": hint,
            "warnings": [],
        }

    try:
        write_summary(build_summary_entry(result))
    except Exception:
        logger.exception("Failed to write summary file")

    sys.exit(1 if result["status"] in ("error", "partial") else 0)


if __name__ == "__main__":
    main()
