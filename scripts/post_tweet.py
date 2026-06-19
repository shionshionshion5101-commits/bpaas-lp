#!/usr/bin/env python3
"""
Post scheduled tweets from a weekly CSV.
Usage: python scripts/post_tweet.py [csv_path]
Slot (12:00 / 21:00) is inferred from current hour (JST).
"""
from __future__ import annotations

import csv
import os
import sys
from datetime import datetime, timezone, timedelta

import tweepy

JST = timezone(timedelta(hours=9))

DAY_MAP = {
    0: "月曜日",
    1: "火曜日",
    2: "水曜日",
    3: "木曜日",
    4: "金曜日",
    5: "土曜日",
    6: "日曜日",
}


def current_slot() -> str:
    hour = datetime.now(JST).hour
    return "12:00" if hour < 17 else "21:00"


def find_post(csv_path: str, day: str, slot: str) -> dict | None:
    with open(csv_path, encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if row["曜日"] == day and row["時間"] == slot:
                return row
    return None


def build_client() -> tweepy.Client:
    return tweepy.Client(
        consumer_key=os.environ["X_API_KEY"],
        consumer_secret=os.environ["X_API_KEY_SECRET"],
        access_token=os.environ["X_ACCESS_TOKEN"],
        access_token_secret=os.environ["X_ACCESS_TOKEN_SECRET"],
    )


def main() -> None:
    csv_path = sys.argv[1] if len(sys.argv) > 1 else "x_posts_week1.csv"

    now = datetime.now(JST)
    day = DAY_MAP[now.weekday()]
    slot = current_slot()
    print(f"[{now.strftime('%Y-%m-%d %H:%M JST')}] {day} {slot} — {csv_path}")

    post = find_post(csv_path, day, slot)
    if not post:
        print("No post found for this slot. Exiting.")
        sys.exit(0)

    client = build_client()

    response = client.create_tweet(text=post["本文"])
    tweet_id = response.data["id"]
    print(f"Posted: https://x.com/i/web/status/{tweet_id}")

    self_reply = post.get("セルフリプライ", "").strip()
    if self_reply:
        client.create_tweet(text=self_reply, in_reply_to_tweet_id=tweet_id)
        print("Self-reply posted.")


if __name__ == "__main__":
    main()
