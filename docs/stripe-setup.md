# Stripe Payment Link 設定手順

## 1. Payment Link を2本作成

Stripe ダッシュボード → Payment Links → 新規作成

| プラン | 商品名 | 金額 |
|---|---|---|
| ライト | ユーザーテスト代行 ライトプラン（5人テスト） | ¥19,800 |
| スタンダード | ユーザーテスト代行 スタンダードプラン（10人テスト） | ¥49,800 |

## 2. 各リンクの Metadata を設定

Payment Link の作成画面 → 「詳細設定」→「メタデータ」

| キー | ライト | スタンダード |
|---|---|---|
| `plan` | `light` | `standard` |

この metadata は Webhook の `session.metadata.plan` で参照されます。

## 3. 決済後のリダイレクト URL を設定

「決済後の設定」→「自社サイトへ転送」を選択し、以下の URL を設定:

```
https://www.workle-kle.com/test/thanks?session_id={CHECKOUT_SESSION_ID}
```

**重要: `{CHECKOUT_SESSION_ID}` はそのまま入力する。Stripe が自動で実際のセッションIDに置換する。**

## 4. 領収書の自動送信をON

Stripe ダッシュボード → 設定 → メール → 「領収書を自動送信する」をON

## 5. インボイス制度対応

Stripe ダッシュボード → 設定 → 事業者情報 → 適格請求書発行事業者の登録番号を入力

**未取得の場合:** `/test` ページのFAQに以下を追記してください:
「適格請求書（インボイス）の発行には現在対応していません。」

## 6. Webhook を登録

Stripe ダッシュボード → Webhook → エンドポイントを追加

- URL: `https://www.workle-kle.com/api/stripe/webhook`
- リッスンするイベント: `checkout.session.completed`
- 署名シークレットをコピー → `STRIPE_WEBHOOK_SECRET` 環境変数に設定

## 7. 環境変数の設定

```bash
# Stripe
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production

# Supabase
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add SUPABASE_SERVICE_ROLE_KEY production

# 入稿フォームは自社実装（/test/intake/[token]）。Tally は廃止済み。
# 参考資料アップロードには Supabase Storage の intake-files バケットを使用（下記参照）。

# メール送信 (Resend)
vercel env add RESEND_API_KEY production

# Slack通知 (任意)
vercel env add SLACK_WEBHOOK_URL production
```

設定後は必ず再デプロイ: `vercel --prod`

---

# Supabase テーブル作成 SQL

```sql
-- リード（サンプルDL希望者）
create table leads (
  id          bigint generated always as identity primary key,
  email       text not null unique,
  source      text not null default 'sample_download',
  created_at  timestamptz not null default now()
);

-- 受注（Stripe決済完了後）
create table orders (
  session_id      text primary key,
  access_token    uuid not null default gen_random_uuid(),
  customer_email  text,
  plan            text,           -- 'light' | 'standard'
  amount          integer,        -- 単位: 円(Stripeのamount_totalはセント単位なので要確認)
  status          text not null default 'pending_intake',
  -- pending_intake / design_review / scheduled / delivered
  scheduled_date  date,
  report_url      text,
  sheet_url       text,
  created_at      timestamptz not null default now()
);

-- access_token でのルックアップを高速化
create unique index orders_access_token_idx on orders(access_token);

-- 入稿（自社フォーム /test/intake/[token] からの送信内容）
create table intakes (
  id                 uuid primary key default gen_random_uuid(),
  session_id         text references orders(session_id),
  service_name       text not null,
  service_url        text not null,
  platform           text not null,          -- ios / android / web / other
  one_liner          text not null,
  target_user        text,
  login_required     boolean default false,
  test_account       text,
  purchase_handling  text,
  main_question      text not null,
  tasks              text,
  tasks_delegate     boolean default false,
  competitors        text,
  known_issues       text,
  persona_conditions text,
  ng_items           text,
  case_study_ok      boolean default false,
  preferred_period   text,                   -- asap / within_2w / within_1m / flexible
  contact_x          text,
  file_urls          text[],                 -- Supabase Storage のパス
  created_at         timestamptz not null default now()
);

create index intakes_session_id_idx on intakes(session_id);
```

**Supabase RLS 設定:** `orders` / `intakes` テーブルは service_role のみアクセス可能にする（RLSを有効にしてpolicyなし）。API はすべて service role キー経由でアクセスするため、匿名ロールにポリシーは付与しない。

---

# Supabase Storage: intake-files バケット

入稿フォームの「参考資料」アップロード先。**非公開バケット**として作成する。

## 作成手順

Supabase ダッシュボード → Storage → New bucket

- **Name:** `intake-files`
- **Public bucket:** OFF（非公開）
- **File size limit:** 10 MB（任意。アプリ側でも10MB上限を検証）

## ポリシー

匿名・認証ユーザーからの直接アクセスは不要（アップロードは service role を使う API 経由 `/api/intake/upload`）。したがって **RLS ポリシーは付与しない**（＝匿名アクセス不可のまま）。

Workle 側がファイルを閲覧する際は、ダッシュボードから開くか、必要に応じて署名付きURLを発行する:

```sql
-- 例: 1時間有効な署名付きURLを発行（SQLではなくダッシュボード or supabase-js で）
-- db.storage.from('intake-files').createSignedUrl(path, 3600)
```

`intakes.file_urls` にはバケット内のパス（例: `cs_test_xxx/1699999999-ab12cd34-mockup.png`）を保存している。

---

# Webhook ローカルテスト手順（Stripe CLI）

```bash
# 1. Stripe CLI をインストール
brew install stripe/stripe-cli/stripe

# 2. ログイン
stripe login

# 3. ローカルへ転送（別ターミナルで実行）
stripe listen --forward-to localhost:3000/api/stripe/webhook

# 4. テストイベントを送信
stripe trigger checkout.session.completed

# 5. ログを確認
# stripe listen の出力にWebhook受信ログが表示される
```

環境変数 `STRIPE_WEBHOOK_SECRET` に `stripe listen` が出力する `whsec_...` を設定する。

---

# 未接続 TODO 一覧

| ファイル | 行 | 内容 |
|---|---|---|
| `app/lib/email.ts` | 冒頭コメント | `RESEND_API_KEY` 設定で自動接続される。未設定時はno-op |
| `app/api/leads/route.ts` | Supabase upsert | `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` 設定で接続 |
| `app/api/stripe/webhook/route.ts` | Slack通知 | `SLACK_WEBHOOK_URL` 設定で接続 |
| `public/samples/sample-cover.png` | — | PDF表紙のPNG変換が必要。コマンド: `convert -density 200 public/samples/workle-usertest-report-sample.pdf[0] public/samples/sample-cover.png` (ImageMagickが必要) |

---

# 納品時の顧客通知（ステータス変更）

現状は `delivered` ステータスへの変更は Supabase 管理画面から手動で行う運用。
顧客への通知が必要な場合、以下のいずれかで対応:

**A. Supabase Database Webhook（推奨）**
Supabase ダッシュボード → Database → Webhooks → 新規作成
- テーブル: `orders`
- イベント: `UPDATE`
- 条件: `status = 'delivered'`
- 送信先: `https://www.workle-kle.com/api/stripe/webhook` または別の通知エンドポイント

**B. 手動メールテンプレート**
件名: `【Workle】レポートが届きました`
本文:
```
{顧客名} 様

レポートの納品が完了しました。

■ レポート: {report_url}
■ 実施記録シート: {sheet_url}

ご確認のほど、よろしくお願いいたします。

Workle
```

---

# 環境変数一覧と未設定時の挙動

| 変数 | 必須 | 未設定時の挙動 |
|---|---|---|
| `STRIPE_SECRET_KEY` | ○（thanks/webhook） | thanks ページがエラーメッセージを表示 |
| `STRIPE_WEBHOOK_SECRET` | ○（webhook） | Webhook が503を返す |
| `NEXT_PUBLIC_STRIPE_LIGHT_URL` | ○ | 料金カードの「申し込む」が相談URLにフォールバック |
| `NEXT_PUBLIC_STRIPE_STANDARD_URL` | ○ | 同上 |
| `NEXT_PUBLIC_SUPABASE_URL` | △ | リード保存・進捗ページが機能しない |
| `SUPABASE_SERVICE_ROLE_KEY` | △ | 同上 |
| `RESEND_API_KEY` | △ | メール送信がno-op（モーダルは正常動作） |
| `SLACK_WEBHOOK_URL` | ✕（任意） | Slack通知なし（入稿完了通知も含む） |

## 入稿フォーム（自社実装）

- URL: `/test/intake/[token]`（token = `orders.access_token`）。ログイン不要・トークン照合。
- 保存先: `intakes` テーブル（上記）。参考資料は `intake-files` バケット。
- 送信後 `orders.status` を `design_review` に更新し、`SLACK_WEBHOOK_URL` があれば通知。
- 送信済みの再アクセスは読み取り専用表示になる。
- 決済後の導線: Stripe Webhook → 注文確認メール／`/test/thanks`／`/test/status/[token]` すべて `/test/intake/[token]` を指す。
