# Workle LP — チェックリスト

凡例: ✅ 完了 / 🔲 未着手 / 🚧 対応中 / ❌ 問題あり

---

## 機能要件

### セクション構成

| # | セクション | 内容 | 状態 |
|---|-----------|------|------|
| 1 | Header | スティッキーナビ・ロゴ・「プランを見る」「テスト導入」リンク | ✅ |
| 2 | Hero | キャッチコピー・サブコピー・CTA（#plans へ） | ✅ |
| 3 | Pain & Solution | 3ステップカード（タスクを積む→プロが実行→Ship完了） | ✅ |
| 4 | Comparison Table | Workle vs 従来代行業者（3軸比較） | ✅ |
| 5 | Plans | Indie Plan（¥30,000/月）・Business Plan（レベニューシェア） | ✅ |
| 6 | Why Workle | Notionタスクボードのモックアップ付き背景説明 | ✅ |
| 7 | FAQ | アコーディオン（`<details>`要素） | ✅ |
| 8 | Footer / Contact | `id="contact"` · コピーライト | ✅ |

### インタラクション・導線

| 項目 | 詳細 | 状態 |
|------|------|------|
| アンカーリンク | `#plans`・`#contact` へのスクロール | ✅ |
| FAQ アコーディオン | `<details>` / `<summary>` で開閉 | ✅ |
| CTA の遷移先 | 各ボタンが `#contact` を指しているが、問い合わせフォームが未設置 | 🔲 |
| 問い合わせフォーム | Tally (`https://tally.so/r/1A6Yzg`) を全CTAに設置 | ✅ |
| 決済リンク | Indie Plan の「決済して〜」ボタンの実際の決済先 URL 設定 | 🔲 |

### コンテンツ

| 項目 | 状態 |
|------|------|
| FAQ 追加（現在1件のみ） | 🔲 |
| 料金・成果報酬の詳細説明 | 🔲 |
| 実績・導入事例 | 🔲 |

---

## 非機能要件

### SEO

| 項目 | 詳細 | 状態 |
|------|------|------|
| `<title>` | "Workle — コードを書いたら、1秒で市場にShipする" | ✅ |
| `<meta description>` | サービス概要・プラン情報を含む | ✅ |
| `lang` 属性 | `lang="ja"` | ✅ |
| OG 画像 (`opengraph-image`) | SNS シェア時のサムネイル | 🔲 |
| Twitter Card | `twitter:card` / `twitter:image` | 🔲 |
| `sitemap.xml` | `app/sitemap.ts` で生成 | 🔲 |
| `robots.txt` | `app/robots.ts` で生成 | 🔲 |
| Canonical URL | `metadataBase` の設定 | 🔲 |
| 構造化データ (JSON-LD) | FAQ スキーマ・サービス概要スキーマ | 🔲 |

### パフォーマンス

| 項目 | 詳細 | 状態 |
|------|------|------|
| LCP | ヒーローの `<h1>` が最大コンテンツ要素。フォント読み込み最適化 | 🔲 |
| CLS | フォントの `font-display` 設定 (`next/font` で自動対応) | ✅ |
| フォントサブセット | 現在 `subsets: ["latin"]` のみ。日本語フォントは未設定 | 🔲 |
| 画像最適化 | `public/` に画像追加時は `next/image` を使用すること | 🔲 |
| バンドルサイズ | Server Component のみ構成を維持（Client Component を増やさない） | ✅ |

### アクセシビリティ

| 項目 | 詳細 | 状態 |
|------|------|------|
| カラーコントラスト | `text-zinc-500` on `bg-[#0a0a0a]` の比率確認 | 🔲 |
| フォーカスリング | キーボード操作時の視認性 | 🔲 |
| `<summary>` のARIA | FAQ の `<details>` はブラウザネイティブなので基本的に問題なし | ✅ |
| セマンティックHTML | `<header>` / `<section>` / `<footer>` を適切に使用 | ✅ |

### コード品質

| 項目 | 詳細 | 状態 |
|------|------|------|
| React key（Fragment） | `steps.map` の Fragment に key を付与 | ✅ |
| TypeScript エラー | `npm run build` でエラーなし | 🔲 |
| ESLint | `npm run lint` でエラーなし | 🔲 |

### デプロイ・インフラ

| 項目 | 詳細 | 状態 |
|------|------|------|
| Vercel デプロイ | 本番 URL の設定 | 🔲 |
| 独自ドメイン | ドメイン取得・DNS 設定 | 🔲 |
| HTTPS | Vercel で自動対応 | 🔲 |
| 環境変数 | `.env.local` / Vercel の Environment Variables | 🔲 |

### アナリティクス

| 項目 | 詳細 | 状態 |
|------|------|------|
| PV 計測 | Google Analytics 4 または Vercel Analytics | 🔲 |
| コンバージョン計測 | CTA クリック・フォーム送信のトラッキング | 🔲 |
