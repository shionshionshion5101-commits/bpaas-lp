#!/usr/bin/env python3
"""
Weekly note.com article generator: 今週の個人開発リリース5選
Runs every Monday via GitHub Actions.
Saves draft Markdown to note-drafts/YYYY-MM-DD.md
"""

import os
import json
import datetime
from pathlib import Path

import requests
import anthropic
from bs4 import BeautifulSoup

ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]
HN_ALGOLIA = "https://hn.algolia.com/api/v1/search"
GITHUB_TRENDING_URL = "https://github.com/trending?since=weekly"
OUTPUT_DIR = Path("note-drafts")


def fetch_show_hn(days: int = 7, limit: int = 25) -> list[dict]:
    """Return top Show HN posts from the past N days via Algolia HN Search API."""
    cutoff = int(
        (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(days=days)).timestamp()
    )
    try:
        resp = requests.get(
            HN_ALGOLIA,
            params={
                "tags": "show_hn",
                "numericFilters": f"created_at_i>{cutoff}",
                "hitsPerPage": limit,
            },
            timeout=10,
        )
        resp.raise_for_status()
        hits = resp.json().get("hits", [])
        return [
            {
                "title": h.get("title", ""),
                "url": h.get("url") or f"https://news.ycombinator.com/item?id={h.get('objectID')}",
                "score": h.get("points", 0),
                "comments": h.get("num_comments", 0),
            }
            for h in hits
        ]
    except Exception as e:
        print(f"[WARN] Show HN fetch failed: {e}")
        return []


def fetch_github_trending() -> list[dict]:
    """Return top GitHub trending repos this week."""
    try:
        resp = requests.get(
            GITHUB_TRENDING_URL,
            headers={"User-Agent": "Mozilla/5.0 (compatible; WorkleBot/1.0)"},
            timeout=15,
        )
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")

        repos = []
        for article in soup.select("article.Box-row"):
            name_tag = article.select_one("h2 a")
            desc_tag = article.select_one("p")
            stars_tag = article.select_one("a[href$='/stargazers']")

            if not name_tag:
                continue

            href = name_tag.get("href", "")
            repos.append({
                "name": name_tag.get_text(" ", strip=True).replace("\n", ""),
                "url": f"https://github.com{href}",
                "description": desc_tag.get_text(strip=True) if desc_tag else "",
                "stars_this_week": stars_tag.get_text(strip=True) if stars_tag else "?",
            })

        return repos[:20]
    except Exception as e:
        print(f"[WARN] GitHub Trending fetch failed: {e}")
        return []


def generate_article(hn_posts: list[dict], gh_repos: list[dict]) -> str:
    """Use Claude to write a Japanese note article from research data."""
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    today = datetime.date.today().strftime("%Y/%m/%d")

    research = json.dumps(
        {"show_hn": hn_posts, "github_trending": gh_repos},
        ensure_ascii=False,
        indent=2,
    )

    prompt = f"""あなたはWorkle（個人開発者のマーケ・営業を支援するBPaaS）の公式noteライターです。

以下のリサーチデータから、今週最も注目すべき「個人開発リリース」を5つ厳選し、日本語のnote記事を書いてください。

## 選定基準
- 個人または小チームが作ったプロダクト・ツール・サービスを優先する
- 大企業・有名スタートアップの発表は除く
- 実際に使えるもの（デモ・リリース済み）を優先
- 技術的に面白い、または市場ニーズに刺さるものを選ぶ

## 記事の方針
- 読者は「自分でプロダクトを作っている日本語話者の個人開発者」
- 「面白い、自分も試したい、参考になる」と感じさせる紹介文
- 各プロダクトに2〜4文の紹介（何ができるか＋なぜ面白いか）
- 記事末尾に1〜2文でWorkleへの自然な言及（「こんなプロダクトを"届ける"ために…」のようなトーン）

## フォーマット（Markdownで出力）
タイトル行: # 今週の個人開発リリース5選 — {today}

各プロダクトは番号付き見出し（## 1. プロダクト名）で区切り、URLを含める。
冒頭に2〜3文のリード文をつける。

## リサーチデータ
{research}
"""

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2500,
        messages=[{"role": "user", "content": prompt}],
    )
    return message.content[0].text


def main() -> None:
    print("Fetching Show HN posts...")
    hn_posts = fetch_show_hn()
    print(f"  {len(hn_posts)} posts found")

    print("Fetching GitHub Trending (weekly)...")
    gh_repos = fetch_github_trending()
    print(f"  {len(gh_repos)} repos found")

    if not hn_posts and not gh_repos:
        raise RuntimeError("Both data sources failed — aborting to avoid empty article")

    print("Generating article with Claude...")
    article = generate_article(hn_posts, gh_repos)

    OUTPUT_DIR.mkdir(exist_ok=True)
    today = datetime.date.today().isoformat()
    output_path = OUTPUT_DIR / f"{today}.md"
    output_path.write_text(article, encoding="utf-8")

    print(f"Draft saved: {output_path}")
    print("--- preview ---")
    print(article[:600])


if __name__ == "__main__":
    main()
