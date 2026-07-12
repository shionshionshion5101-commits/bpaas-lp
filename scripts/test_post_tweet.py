"""Tests for scripts/post_tweet.py — all network calls are mocked."""
from __future__ import annotations

import json
from datetime import datetime
from types import SimpleNamespace

import pytest
import requests
import tweepy

import post_tweet
from post_tweet import (
    ConfigError,
    JST,
    STATUS_DONE,
    build_summary_entry,
    describe_error,
    find_post_from_csv,
    is_due,
    is_within_slot,
    select_row,
    send_tweet,
    tweet_weight,
    validate_post_text,
    with_retries,
    write_summary,
)

NOON = datetime(2026, 7, 6, 12, 0, tzinfo=JST)  # Monday 12:00 JST


# ---------------------------------------------------------------- fakes

class FakeResponse:
    def __init__(self, status_code=429, reason="Too Many Requests", body=None):
        self.status_code = status_code
        self.reason = reason
        self.text = json.dumps(body or {})
        self._body = body or {}

    def json(self):
        return self._body


class FakeClient:
    """Stands in for tweepy.Client; records calls, can fail N times first."""

    def __init__(self, fail_times=0, exc=None):
        self.calls = []
        self.fail_times = fail_times
        self.exc = exc

    def create_tweet(self, text=None, in_reply_to_tweet_id=None):
        self.calls.append({"text": text, "reply_to": in_reply_to_tweet_id})
        if self.fail_times > 0:
            self.fail_times -= 1
            raise self.exc
        return SimpleNamespace(data={"id": f"9000{len(self.calls)}"})


class FakeSheet:
    def __init__(self, records):
        self.records = records
        self.updates = []

    def get_all_records(self):
        return self.records

    def update_cell(self, row, col, value):
        self.updates.append((row, col, value))


@pytest.fixture(autouse=True)
def no_sleep(monkeypatch):
    monkeypatch.setattr(post_tweet.time, "sleep", lambda s: None)


@pytest.fixture(autouse=True)
def clean_env(monkeypatch):
    for name in ("GOOGLE_SHEET_ID", "GOOGLE_SERVICE_ACCOUNT_JSON", "DRY_RUN",
                 "GITHUB_STEP_SUMMARY", "X_API_KEY", "X_API_KEY_SECRET",
                 "X_ACCESS_TOKEN", "X_ACCESS_TOKEN_SECRET"):
        monkeypatch.delenv(name, raising=False)


# ---------------------------------------------------------------- slot logic

def test_slot_matches_exact_time():
    assert is_within_slot("12:00", NOON)


def test_slot_matches_within_tolerance():
    assert is_within_slot("12:30", NOON)
    assert is_within_slot("11:30", NOON)


def test_slot_rejects_outside_tolerance():
    assert not is_within_slot("12:31", NOON)
    assert not is_within_slot("21:00", NOON)


def test_is_due_matches_on_time_and_late_cron():
    """GitHub Actions cron fires hours late; sheet rows must stay eligible."""
    assert is_due("12:00", NOON)
    assert is_due("12:00", NOON.replace(hour=15, minute=40))  # 3h40m late (observed)
    assert is_due("12:00", NOON.replace(hour=18, minute=0))   # 6h = limit


def test_is_due_rejects_future_and_expired_slots():
    assert not is_due("12:00", NOON.replace(hour=11, minute=59))  # not yet due
    assert not is_due("12:00", NOON.replace(hour=18, minute=1))   # past catch-up window
    assert not is_due("21:00", NOON)


def test_is_due_rejects_garbage_time():
    assert not is_due("noon", NOON)
    assert not is_due("", NOON)
    assert not is_due(None, NOON)


def test_slot_rejects_garbage_time():
    assert not is_within_slot("noon", NOON)
    assert not is_within_slot("", NOON)
    assert not is_within_slot("25:99", NOON)
    assert not is_within_slot(None, NOON)


# ---------------------------------------------------------------- text validation

def test_weight_counts_ascii_as_one():
    assert tweet_weight("abc") == 3


def test_weight_counts_japanese_as_two():
    assert tweet_weight("あいう") == 6


def test_weight_counts_url_as_23():
    assert tweet_weight("https://example.com/very/long/path/here") == 23
    assert tweet_weight("見て https://example.com") == 4 + 1 + 23


def test_validate_rejects_empty_text():
    assert validate_post_text("") != []
    assert validate_post_text("   \n ") != []


def test_validate_rejects_too_long_text():
    assert validate_post_text("あ" * 141) != []


def test_validate_accepts_normal_post():
    assert validate_post_text("あ" * 140) == []
    assert validate_post_text("個人開発者向けのふつうの投稿です。") == []


# ---------------------------------------------------------------- row selection

def make_row(date="2026-07-06", time_="12:00", status="", text="本文です"):
    return {"投稿日付": date, "時間": time_, "柱": "B", "構文": "共感",
            "本文": text, "セルフリプライ": "", "ステータス": status}


def test_select_row_picks_matching_row():
    records = [make_row(time_="21:00"), make_row()]
    assert select_row(records, NOON) == (1, records[1])


def test_select_row_skips_done_rows():
    records = [make_row(status=STATUS_DONE)]
    assert select_row(records, NOON) is None


def test_select_row_skips_other_dates():
    records = [make_row(date="2026-07-05")]
    assert select_row(records, NOON) is None


def test_select_row_handles_empty_sheet():
    assert select_row([], NOON) is None


def test_select_row_catches_up_after_cron_delay():
    records = [make_row()]
    assert select_row(records, NOON.replace(hour=15, minute=40)) == (0, records[0])


def test_select_row_ignores_future_slots():
    records = [make_row(time_="21:00")]
    assert select_row(records, NOON) is None


# ---------------------------------------------------------------- CSV mode

CSV_HEADER = "曜日,時間,柱,構文,本文,セルフリプライ\n"


def test_csv_finds_matching_row(tmp_path):
    p = tmp_path / "posts.csv"
    p.write_text(CSV_HEADER + "月曜日,12:00,B,共感,こんにちは,\n", encoding="utf-8")
    row = find_post_from_csv(str(p), NOON)
    assert row["本文"] == "こんにちは"


def test_csv_returns_none_when_no_match(tmp_path):
    p = tmp_path / "posts.csv"
    p.write_text(CSV_HEADER + "火曜日,12:00,B,共感,こんにちは,\n", encoding="utf-8")
    assert find_post_from_csv(str(p), NOON) is None


def test_csv_missing_file_raises_config_error():
    with pytest.raises(ConfigError, match="見つかりません"):
        find_post_from_csv("no/such/file.csv", NOON)


def test_csv_missing_column_raises_config_error(tmp_path):
    p = tmp_path / "posts.csv"
    p.write_text("曜日,時間\n月曜日,12:00\n", encoding="utf-8")
    with pytest.raises(ConfigError, match="本文"):
        find_post_from_csv(str(p), NOON)


# ---------------------------------------------------------------- retries

def test_with_retries_recovers_from_transient_failure():
    attempts = []

    def flaky():
        attempts.append(1)
        if len(attempts) < 3:
            raise requests.exceptions.ConnectionError("boom")
        return "ok"

    assert with_retries("flaky", flaky, delay=0) == "ok"
    assert len(attempts) == 3


def test_with_retries_gives_up_after_max_attempts():
    def always_fails():
        raise requests.exceptions.Timeout("boom")

    with pytest.raises(requests.exceptions.Timeout):
        with_retries("dead", always_fails, delay=0)


def test_with_retries_does_not_retry_unexpected_errors():
    attempts = []

    def broken():
        attempts.append(1)
        raise ValueError("logic bug")

    with pytest.raises(ValueError):
        with_retries("broken", broken, delay=0)
    assert len(attempts) == 1


# ---------------------------------------------------------------- send_tweet

def test_send_tweet_returns_id_on_success():
    client = FakeClient()
    assert send_tweet(client, "hello") == "90001"


def test_send_tweet_retries_on_rate_limit():
    exc = tweepy.TooManyRequests(FakeResponse(429, "Too Many Requests"))
    client = FakeClient(fail_times=2, exc=exc)
    assert send_tweet(client, "hello") == "90003"
    assert len(client.calls) == 3


def test_send_tweet_gives_up_after_persistent_rate_limit():
    exc = tweepy.TooManyRequests(FakeResponse(429, "Too Many Requests"))
    client = FakeClient(fail_times=99, exc=exc)
    with pytest.raises(tweepy.TooManyRequests):
        send_tweet(client, "hello")


def test_send_tweet_does_not_retry_auth_errors():
    exc = tweepy.Unauthorized(FakeResponse(401, "Unauthorized"))
    client = FakeClient(fail_times=99, exc=exc)
    with pytest.raises(tweepy.Unauthorized):
        send_tweet(client, "hello")
    assert len(client.calls) == 1


def test_send_tweet_treats_duplicate_after_retry_as_posted():
    """Network error then 'duplicate content' means the first attempt landed."""

    class DupClient(FakeClient):
        def create_tweet(self, text=None, in_reply_to_tweet_id=None):
            self.calls.append(text)
            if len(self.calls) == 1:
                raise requests.exceptions.ConnectionError("reset")
            raise tweepy.Forbidden(FakeResponse(
                403, "Forbidden",
                {"detail": "You are not allowed to create a Tweet with duplicate content."},
            ))

    assert send_tweet(DupClient(), "hello") is None


def test_send_tweet_raises_on_first_attempt_forbidden():
    exc = tweepy.Forbidden(FakeResponse(403, "Forbidden"))
    client = FakeClient(fail_times=99, exc=exc)
    with pytest.raises(tweepy.Forbidden):
        send_tweet(client, "hello")


# ---------------------------------------------------------------- error mapping

def test_describe_error_covers_common_cases():
    cause, hint = describe_error(ConfigError("設定ミス", "こう直す"))
    assert cause == "設定ミス" and hint == "こう直す"

    cause, _ = describe_error(tweepy.TooManyRequests(FakeResponse()))
    assert "レート制限" in cause

    cause, _ = describe_error(tweepy.Unauthorized(FakeResponse(401, "Unauthorized")))
    assert "認証" in cause

    cause, _ = describe_error(requests.exceptions.ConnectionError("x"))
    assert "ネットワーク" in cause

    cause, _ = describe_error(RuntimeError("mystery"))
    assert "想定外" in cause


# ---------------------------------------------------------------- summary file

def test_write_summary_creates_file_with_header(tmp_path):
    path = str(tmp_path / "logs" / "post_summary.md")
    write_summary("## entry1\n", path=path)
    content = open(path, encoding="utf-8").read()
    assert "X自動投稿 実行ログ" in content
    assert "## entry1" in content


def test_write_summary_prepends_newest_first(tmp_path):
    path = str(tmp_path / "logs" / "post_summary.md")
    write_summary("## older\n", path=path)
    write_summary("## newer\n", path=path)
    content = open(path, encoding="utf-8").read()
    assert content.index("## newer") < content.index("## older")


def test_write_summary_also_writes_github_step_summary(tmp_path, monkeypatch):
    step = tmp_path / "step_summary.md"
    step.write_text("")
    monkeypatch.setenv("GITHUB_STEP_SUMMARY", str(step))
    write_summary("## entry\n", path=str(tmp_path / "s.md"))
    assert "## entry" in step.read_text(encoding="utf-8")


def test_build_summary_entry_renders_all_fields():
    entry = build_summary_entry({
        "time": "2026-07-06 12:00 JST", "status": "partial",
        "source": "Google Sheets",
        "tweet_url": "https://x.com/i/web/status/1",
        "reply": "投稿済み", "warnings": ["何かの注意"],
    })
    for fragment in ("2026-07-06", "一部失敗", "Google Sheets",
                     "status/1", "投稿済み", "何かの注意"):
        assert fragment in entry


# ---------------------------------------------------------------- run() end-to-end

def sheets_env(monkeypatch, records, client=None):
    sheet = FakeSheet(records)
    monkeypatch.setenv("GOOGLE_SHEET_ID", "sheet-id-123")
    monkeypatch.setattr(post_tweet, "load_sheet", lambda sheet_id: sheet)
    monkeypatch.setattr(post_tweet, "build_client", lambda: client or FakeClient())
    return sheet


def test_run_posts_and_marks_done(monkeypatch):
    client = FakeClient()
    sheet = sheets_env(monkeypatch, [make_row()], client)
    result = post_tweet.run(NOON, None, dry_run=False)
    assert result["status"] == "posted"
    assert result["tweet_url"].endswith("90001")
    # row 1 + header offset = sheet row 2; ステータス is column 7
    assert sheet.updates == [(2, 7, STATUS_DONE)]


def test_run_posts_self_reply(monkeypatch):
    client = FakeClient()
    row = make_row()
    row["セルフリプライ"] = "続きです"
    sheets_env(monkeypatch, [row], client)
    result = post_tweet.run(NOON, None, dry_run=False)
    assert result["status"] == "posted"
    assert result["reply"] == "投稿済み"
    assert client.calls[1] == {"text": "続きです", "reply_to": "90001"}


def test_run_reports_no_post_for_empty_slot(monkeypatch):
    sheets_env(monkeypatch, [make_row(status=STATUS_DONE)])
    result = post_tweet.run(NOON, None, dry_run=False)
    assert result["status"] == "no_post"


def test_run_dry_run_never_touches_apis(monkeypatch):
    sheet = sheets_env(monkeypatch, [make_row()])
    monkeypatch.setattr(post_tweet, "build_client",
                        lambda: pytest.fail("must not build client in dry run"))
    result = post_tweet.run(NOON, None, dry_run=True)
    assert result["status"] == "dry_run"
    assert sheet.updates == []


def test_run_rejects_invalid_text_without_posting(monkeypatch):
    client = FakeClient()
    sheet = sheets_env(monkeypatch, [make_row(text="")], client)
    result = post_tweet.run(NOON, None, dry_run=False)
    assert result["status"] == "error"
    assert "本文" in result["error"]
    assert client.calls == []
    assert sheet.updates == []


def test_run_partial_when_mark_done_fails(monkeypatch):
    client = FakeClient()

    class BrokenSheet(FakeSheet):
        def update_cell(self, row, col, value):
            raise requests.exceptions.ConnectionError("sheets down")

    sheet = BrokenSheet([make_row()])
    monkeypatch.setenv("GOOGLE_SHEET_ID", "sheet-id-123")
    monkeypatch.setattr(post_tweet, "load_sheet", lambda sheet_id: sheet)
    monkeypatch.setattr(post_tweet, "build_client", lambda: client)

    result = post_tweet.run(NOON, None, dry_run=False)
    assert result["status"] == "partial"
    assert result["tweet_url"]  # the tweet itself went out
    assert any("済み" in w for w in result["warnings"])


def test_run_partial_when_reply_fails(monkeypatch):
    row = make_row()
    row["セルフリプライ"] = "続きです"

    class MainOnlyClient(FakeClient):
        def create_tweet(self, text=None, in_reply_to_tweet_id=None):
            if in_reply_to_tweet_id:
                raise tweepy.Forbidden(FakeResponse(403, "Forbidden"))
            return super().create_tweet(text, in_reply_to_tweet_id)

    sheets_env(monkeypatch, [row], MainOnlyClient())
    result = post_tweet.run(NOON, None, dry_run=False)
    assert result["status"] == "partial"
    assert any("セルフリプライ" in w for w in result["warnings"])


def test_run_csv_mode_dry_run(monkeypatch, tmp_path):
    p = tmp_path / "posts.csv"
    p.write_text(CSV_HEADER + "月曜日,12:00,B,共感,こんにちは,\n", encoding="utf-8")
    result = post_tweet.run(NOON, str(p), dry_run=True)
    assert result["status"] == "dry_run"
    assert "CSV" in result["source"]


def test_run_missing_credentials_raises_config_error(monkeypatch, tmp_path):
    p = tmp_path / "posts.csv"
    p.write_text(CSV_HEADER + "月曜日,12:00,B,共感,こんにちは,\n", encoding="utf-8")
    with pytest.raises(ConfigError, match="X API"):
        post_tweet.run(NOON, str(p), dry_run=False)


def test_load_sheet_without_service_account_raises(monkeypatch):
    monkeypatch.setenv("GOOGLE_SHEET_ID", "sheet-id-123")
    with pytest.raises(ConfigError, match="GOOGLE_SERVICE_ACCOUNT_JSON"):
        post_tweet.run(NOON, None, dry_run=False)


def test_load_sheet_with_broken_json_raises(monkeypatch):
    monkeypatch.setenv("GOOGLE_SHEET_ID", "sheet-id-123")
    monkeypatch.setenv("GOOGLE_SERVICE_ACCOUNT_JSON", "{not json")
    with pytest.raises(ConfigError, match="JSON"):
        post_tweet.run(NOON, None, dry_run=False)
