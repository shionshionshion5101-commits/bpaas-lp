"""Tests for scripts/check_posts.py — read-only content checks, no network."""
from __future__ import annotations

import pytest

import check_posts
from check_posts import check_row, find_weird_chars


def make_row(body="今日は3時間で機能を1つ出した。", reply="", day="月曜日", time_="12:00"):
    return {"曜日": day, "時間": time_, "柱": "B", "構文": "共感",
            "本文": body, "セルフリプライ": reply}


def assert_clean(row):
    errors, _ = check_row(row, 2, allow_placeholders=False)
    assert errors == []


def test_valid_row_has_no_errors():
    assert_clean(make_row())


def test_empty_body_is_error():
    errors, _ = check_row(make_row(body=""), 2, allow_placeholders=False)
    assert any("本文" in e for e in errors)


def test_too_long_body_is_error():
    errors, _ = check_row(make_row(body="あ1" * 100), 2, allow_placeholders=False)
    assert any("長すぎ" in e for e in errors)


def test_invalid_day_is_error():
    errors, _ = check_row(make_row(day="月"), 2, allow_placeholders=False)
    assert any("曜日" in e for e in errors)


def test_invalid_time_is_error():
    for bad in ("25:99", "12時", "", "12:5"):
        errors, _ = check_row(make_row(time_=bad), 2, allow_placeholders=False)
        assert any("時間" in e for e in errors), bad


def test_hashtag_is_error():
    errors, _ = check_row(make_row(body="3日で作った #個人開発"), 2, allow_placeholders=False)
    assert any("ハッシュタグ" in e for e in errors)


def test_ng_word_is_error():
    errors, _ = check_row(make_row(body="これで簡単に稼げる話を1つ。"), 2, allow_placeholders=False)
    assert any("NGワード" in e for e in errors)


def test_url_in_body_is_error_but_ok_in_reply():
    errors, _ = check_row(make_row(body="詳細は https://example.com で。1分で読める"),
                          2, allow_placeholders=False)
    assert any("URL" in e for e in errors)

    errors, _ = check_row(make_row(reply="詳細: https://example.com"),
                          2, allow_placeholders=False)
    assert errors == []


def test_placeholder_is_error_by_default_and_warn_when_allowed():
    row = make_row(body="ユーザー数は【実数】人になった。")
    errors, warnings = check_row(row, 2, allow_placeholders=False)
    assert any("プレースホルダ" in e for e in errors)

    errors, warnings = check_row(row, 2, allow_placeholders=True)
    assert errors == []
    assert any("プレースホルダ" in w for w in warnings)


def test_body_without_digits_is_warning_only():
    errors, warnings = check_row(make_row(body="数字のない普通の本文です。"),
                                 2, allow_placeholders=False)
    assert errors == []
    assert any("数字" in w for w in warnings)


def test_find_weird_chars_detects_cyrillic():
    assert find_weird_chars("правда") != []
    assert find_weird_chars("普通の日本語とABC123。\n改行もOK") == []


# ---------------------------------------------------------------- main()

CSV_HEADER = "曜日,時間,柱,構文,本文,セルフリプライ\n"


def run_main(monkeypatch, argv):
    monkeypatch.setattr(check_posts.sys, "argv", ["check_posts.py"] + argv)
    return check_posts.main()


def test_main_ok_csv_returns_zero(tmp_path, monkeypatch, capsys):
    p = tmp_path / "ok.csv"
    p.write_text(CSV_HEADER + "月曜日,12:00,B,共感,3日で1機能出した。,\n", encoding="utf-8")
    assert run_main(monkeypatch, [str(p)]) == 0
    assert "機械チェックはOK" in capsys.readouterr().out


def test_main_bad_csv_returns_one(tmp_path, monkeypatch, capsys):
    p = tmp_path / "bad.csv"
    p.write_text(CSV_HEADER + "月曜日,25:99,B,共感,【実数】人が使った。,\n", encoding="utf-8")
    assert run_main(monkeypatch, [str(p)]) == 1
    out = capsys.readouterr().out
    assert "[ERROR]" in out


def test_main_missing_file_returns_one(monkeypatch, capsys):
    assert run_main(monkeypatch, ["no/such.csv"]) == 1


def test_main_missing_column_returns_one(tmp_path, monkeypatch, capsys):
    p = tmp_path / "cols.csv"
    p.write_text("曜日,時間\n月曜日,12:00\n", encoding="utf-8")
    assert run_main(monkeypatch, [str(p)]) == 1
    assert "必須列" in capsys.readouterr().out


def test_main_empty_csv_returns_one(tmp_path, monkeypatch, capsys):
    p = tmp_path / "empty.csv"
    p.write_text(CSV_HEADER, encoding="utf-8")
    assert run_main(monkeypatch, [str(p)]) == 1
    assert "0件" in capsys.readouterr().out
