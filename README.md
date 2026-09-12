# AI人狼 スタンドアロン版

Claudeアカウント不要で、誰でもブラウザから遊べる人狼ゲームです。

## 元のコードから変えた箇所

1. **`src/App.jsx`**:API呼び出し先を `https://api.anthropic.com/v1/messages` から `/api/claude`(自前の中継サーバー)に変更し、モデル名も実際にAnthropic APIで有効な名前(`claude-sonnet-5`)に変更しました。ゲームのロジック・プロンプト・UIは無変更です。
2. **`src/storagePolyfill.js`**(新規):アーティファクト専用の`window.storage`を、通常のブラウザの`localStorage`で再現する互換レイヤーです。
3. **`api/claude.js`**(新規):Anthropic APIへの中継サーバーレス関数。APIキーはここ(サーバー側)だけに存在し、ブラウザには一切渡りません。
4. **`vercel.json`**(新規)・`api/claude.js`内の`maxDuration`設定:Vercelのサーバーレス関数はデフォルトで実行時間が10秒に制限されており、このゲームはプロンプトが大きいためAIの応答に10秒以上かかることがあります。**明示的に60秒まで延長**し、応答が返ってくる前に処理が打ち切られて「通信エラー」になる問題を防いでいます。

## デプロイ手順

1. Anthropic APIキーを取得する(https://console.anthropic.com → API Keys → Create Key)
   - 「Settings」→「Limits」で月間の使用上限額(スペンドキャップ)を必ず設定してください
2. このフォルダ一式をGitHubリポジトリにアップロードする(`node_modules`は含めなくてよい)
3. Vercel(https://vercel.com )でそのリポジトリをインポートしてデプロイ
4. デプロイ後、Vercelの「Environment Variables」で以下を追加し、Redeployする:
   - Key: `ANTHROPIC_API_KEY`
   - Value: 1.で取得したAPIキー

## 費用について

機能の作り込みが進んだ分、1ゲームあたりのAPIトークン消費は当初(約60〜70円)より増えています。目安として、1ゲームあたり100〜150円程度を想定しておくと安心です。

## ローカルで動作確認したい場合

```
npm install
npm run dev
```

ただし `npm run dev` だけでは `/api/claude` の中継サーバーレス関数は動きません。ローカルでAPI込みの動作確認をしたい場合は、Vercel CLI(`npm i -g vercel` → `vercel dev`)を使ってください。
