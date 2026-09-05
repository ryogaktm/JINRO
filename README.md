# AI人狼 - スタンドアロン公開版

Claude.aiのアーティファクトから、誰でも(Claudeアカウント不要で)遊べる独立したWebアプリに移植したものです。

## 元のコードから変えた箇所(3つだけ)

1. **`src/App.jsx`**:API呼び出し先を `https://api.anthropic.com/v1/messages` から `/api/claude`(自前の中継サーバー)に変更し、モデル名も実際にAnthropic APIで有効な名前(`claude-sonnet-5`)に変更しました。ゲームのロジック・プロンプト・UIは一切変更していません(2026年9月時点の最新版を反映済み)。
2. **`src/storagePolyfill.js`**(新規):アーティファクト専用の`window.storage`を、通常のブラウザの`localStorage`で再現する互換レイヤーです。`App.jsx`側のコードは無変更で動きます(タロットコレクション・告白バッジ等、後から増えたストレージキーにもそのまま対応済みです)。
3. **`api/claude.js`**(新規):Anthropic APIへの中継サーバーレス関数。実際のAPIキーはここ(サーバー側)だけに存在し、ブラウザには一切渡りません。

## デプロイ手順(Vercel想定、無料枠でOK)

### 1. Anthropic APIキーを取得する
1. https://console.anthropic.com にアクセスし、アカウントを作成
2. 「API Keys」からキーを発行(`sk-ant-...`という文字列)
3. **重要**:「Settings」→「Limits」等から、月間の使用上限額(スペンドキャップ)を設定しておくと、想定外の高額請求を防げます

### 2. GitHubにコードを置く
1. GitHubでリポジトリを新規作成
2. このフォルダ一式をアップロード(`node_modules`は含めなくてOK、`.gitignore`で除外済み)

### 3. Vercelでデプロイする
1. https://vercel.com にアクセスし、GitHubアカウントでログイン
2. 「Add New Project」→ 先ほどのGitHubリポジトリを選択
3. 特別な設定は不要(Viteプロジェクトとして自動認識されます)
4. デプロイ前に「Environment Variables」で以下を追加:
   - Key: `ANTHROPIC_API_KEY`
   - Value: 取得したAPIキー(`sk-ant-...`)
5. 「Deploy」をクリック

数分でURLが発行され、そのURLを知り合いに送るだけで、誰でもログイン不要で遊べます。

## ローカルで動作確認したい場合

```bash
npm install
cp .env.example .env
# .env ファイルに実際のAPIキーを書き込む
npm run dev
```

ただし `npm run dev` (Vite単体)では `/api/claude` のサーバーレス関数は動きません。ローカルでAPI呼び出しまで含めて確認したい場合は、Vercel CLIを使ってください:

```bash
npm install -g vercel
vercel dev
```

## 費用について

ゲームの作り込みが進んだ分、1ゲームあたりのAPIトークン消費は当初(約60〜70円)より増えています。目安として、**1ゲームあたり100〜150円程度**を想定しておくと安心です(会話の長さ・投票回数により変動します)。知り合い数人に遊んでもらう規模であれば大きな負担にはならないはずですが、心配な場合はAnthropicコンソールでのスペンドキャップ設定を必ず行ってください。

## 今後、課金システムを追加する場合

現状は誰でも無料で遊べる状態です。将来的にクレジット制の課金を追加する場合は、`api/claude.js`にユーザー認証・残高チェックのロジックを追加する形になります(これも別途対応可能です)。
