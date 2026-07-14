#!/usr/bin/env python3
"""
Weekly note.com article generator: 今週の個人開発リリース5選
Runs every Monday via GitHub Actions.
Saves article + OGP images to note-drafts/YYYY-MM-DD/
"""

import os
import re
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
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; WorkleBot/1.0)"}


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
        resp = requests.get(GITHUB_TRENDING_URL, headers=HEADERS, timeout=15)
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


def select_products(research: str) -> list[dict]:
    """Use Claude Haiku to pick 5 products and return as JSON list."""
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    msg = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=600,
        messages=[{
            "role": "user",
            "content": f"""以下のリサーチデータから、個人・小チームが作ったプロダクトを5つ選んでください。
大企業・有名スタートアップは除く。実際に使えるもの（リリース済み）を優先。

JSONのみ返してください（コードブロック・説明文不要）:
[
  {{"rank": 1, "title": "プロダクト名", "url": "https://..."}},
  {{"rank": 2, "title": "プロダクト名", "url": "https://..."}},
  {{"rank": 3, "title": "プロダクト名", "url": "https://..."}},
  {{"rank": 4, "title": "プロダクト名", "url": "https://..."}},
  {{"rank": 5, "title": "プロダクト名", "url": "https://..."}}
]

{research}""",
        }],
    )
    text = msg.content[0].text.strip()
    match = re.search(r"\[.*\]", text, re.DOTALL)
    if match:
        text = match.group(0)
    return json.loads(text)


def fetch_ogp_image(url: str, dest: Path, stem: str) -> str | None:
    """Fetch og:image from url, save to dest/stem.{ext}. Returns filename or None."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=10)
        soup = BeautifulSoup(resp.text, "html.parser")
        tag = soup.find("meta", property="og:image") or soup.find("meta", attrs={"name": "og:image"})
        if not tag:
            return None
        image_url = tag.get("content", "")
        if not image_url:
            return None

        img_resp = requests.get(image_url, headers=HEADERS, timeout=15)
        img_resp.raise_for_status()

        ct = img_resp.headers.get("content-type", "")
        ext = ".png" if "png" in ct else ".webp" if "webp" in ct else ".gif" if "gif" in ct else ".jpg"
        path = dest / f"{stem}{ext}"
        path.write_bytes(img_resp.content)
        return path.name
    except Exception as e:
        print(f"    [WARN] {e}")
        return None


def generate_article(products: list[dict], image_files: dict[int, str]) -> str:
    """Use Claude Sonnet to write the Japanese note article."""
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    today = datetime.date.today().strftime("%Y/%m/%d")

    product_lines = "\n".join(
        f"{p['rank']}. {p['title']} — {p['url']}"
        + (f"\n   画像ファイル: {image_files[p['rank']]}" if p["rank"] in image_files else "\n   画像: なし")
        for p in products
    )

    msg = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2500,
        messages=[{
            "role": "user",
            "content": f"""あなたはWorkle（個人開発者のマーケ・営業を支援するBPaaS）の公式noteライターです。

以下の5プロダクトについて、日本語のnote記事を書いてください。

## 対象プロダクト
{product_lines}

## 方針
- 読者: 日本語話者の個人開発者
- 各プロダクトに2〜4文（何ができるか＋なぜ面白いか）
- 「画像ファイル」が指定されている場合、見出し直下に「（画像: ファイル名）」と1行メモを入れる
- note向けの読みやすいMarkdown（見出し・区切り線を使う）
- 記事末尾に1〜2文でWorkleへの自然な言及

## フォーマット
# 今週の個人開発リリース5選 — {today}

冒頭リード文（2〜3文）

---

## 1. プロダクト名
（画像: ファイル名）  ← 画像がある場合のみ
URL: https://...

紹介文

---
...（以下5製品分）

---
末尾のWorkle言及
""",
        }],
    )
    return msg.content[0].text


def main() -> None:
    today = datetime.date.today().isoformat()
    out_dir = OUTPUT_DIR / today
    if (out_dir / "article.md").exists():
        print(f"Today's article already exists ({out_dir}/article.md) — skipping")
        return

    print("Fetching Show HN posts...")
    hn_posts = fetch_show_hn()
    print(f"  {len(hn_posts)} posts")

    print("Fetching GitHub Trending (weekly)...")
    gh_repos = fetch_github_trending()
    print(f"  {len(gh_repos)} repos")

    if not hn_posts and not gh_repos:
        raise RuntimeError("Both data sources failed — aborting")

    research = json.dumps(
        {"show_hn": hn_posts, "github_trending": gh_repos},
        ensure_ascii=False,
        indent=2,
    )

    print("Selecting 5 products (Claude Haiku)...")
    products = select_products(research)
    for p in products:
        print(f"  {p['rank']}. {p['title']}")

    out_dir.mkdir(parents=True, exist_ok=True)

    print("Fetching OGP images...")
    image_files: dict[int, str] = {}
    for p in products:
        stem = f"{p['rank']:02d}-{re.sub(r'[^a-z0-9]', '-', p['title'].lower())[:30]}"
        print(f"  [{p['rank']}] {p['url']}")
        saved = fetch_ogp_image(p["url"], out_dir, stem)
        if saved:
            image_files[p["rank"]] = saved
            print(f"       → {saved}")
        else:
            print(f"       → 取得失敗（スキップ）")

    print("Generating article (Claude Sonnet)...")
    article = generate_article(products, image_files)

    article_path = out_dir / "article.md"
    article_path.write_text(article, encoding="utf-8")

    files = sorted(f.name for f in out_dir.iterdir())
    print(f"\nSaved to {out_dir}/")
    for name in files:
        print(f"  {name}")
    print("\n--- preview ---")
    print(article[:500])


if __name__ == "__main__":
    main()
