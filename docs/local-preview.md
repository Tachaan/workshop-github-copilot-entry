# ローカルプレビュー手順

この資料では、ハンズオンサイトと`Support Ticket Dashboard`をローカルのブラウザーで確認する手順を説明します。

## 確認する URL

| 種類 | URL |
| --- | --- |
| 教材サイト | <http://127.0.0.1:8000/> |
| 演習アプリ | <http://127.0.0.1:8000/app/support-ticket-dashboard/> |

## 前提

- Web ブラウザ（Microsoft Edge、Google Chrome など）
- Node.js 20.12.0以上とnpm

Node.jsとnpmが使えるか確認します。

```text
node --version
npm --version
```

## ローカルで起動する

1. エディターまたはターミナルで、このリポジトリのルートフォルダーを開きます。
2. ルートフォルダーに `index.html` と `package.json` があることを確認します。
3. 次のコマンドを実行します。

```text
npm run app
```

4. PowerShell に次のような URL が表示されたら、ブラウザで開きます。

```text
Open the handson site: http://127.0.0.1:8000/
Open the app:          http://127.0.0.1:8000/app/support-ticket-dashboard/
```

5. 確認を終えたら、ターミナルで <kbd>Ctrl</kbd> + <kbd>C</kbd> を押して停止します。

別のポートを使う場合は、`-Port` を指定します。

```text
npm run app -- --port 8001
```

その場合は URL も `http://127.0.0.1:8001/` に変更します。

## Codespaces で確認する

Codespacesでもローカルと同じコマンドで起動します。

```bash
npm run app
```

起動後、次の手順でポートを開きます。

1. VS Code の **ポート** タブを開きます。
2. ポート `8000` が表示されていない場合は、**ポートの転送** を選択して `8000` を入力します。
3. ポート `8000` の **転送されたアドレス** をブラウザで開きます。
4. アプリを確認する場合は、転送されたアドレスの末尾に `/app/support-ticket-dashboard/` を付けます。

例:

```text
https://<codespace-name>-8000.app.github.dev/
https://<codespace-name>-8000.app.github.dev/app/support-ticket-dashboard/
```

Codespaces では `http://127.0.0.1:8000/` ではなく、ポート転送された URL を使います。

## よくあるトラブル

### Node.jsまたはnpmが見つからない

[Node.js公式ダウンロードページ](https://nodejs.org/en/download)からLTS版をインストールし、ターミナルまたはエディターを開き直してください。`node --version`と`npm --version`の両方が表示されることを確認します。

### ポート 8000 が使用中と表示される

別のサーバーがすでに動いている可能性があります。先に起動した PowerShell で <kbd>Ctrl</kbd> + <kbd>C</kbd> を押して停止してから、もう一度実行します。

停止できない場合は別のポートを指定します。

```text
npm run app -- --port 8001
```

ブラウザで開く URL も `8001` に変更してください。

### ファイルを直接開くと Markdown が表示されない

`index.html` をエクスプローラーから直接開くと、URL が `file:///...` になります。この方法ではブラウザの制限により Markdown ファイルを読み込めないことがあります。

必ずローカルサーバーを起動し、次の URL から確認してください。

```text
http://127.0.0.1:8000/
```

## 確認チェックリスト

- [ ] `npm run app`でローカルサーバーを起動できる
- [ ] <http://127.0.0.1:8000/> でOverviewとS1-S5のナビゲーションが表示される
- [ ] `handson/README.md` の内容がサイト内に表示される
- [ ] OverviewからS5まで順番どおりに移動でき、各ページのタイトル、時間、完了条件が表示される
- [ ] ページ内目次が表示され、スクロール位置に合わせて現在の見出しが切り替わる
- [ ] コードブロックに言語名とコピーボタンが表示され、コードをコピーできる
- [ ] 前へ / 次へボタンと左側ナビゲーションで移動できる
- [ ] ヘッダーの `GitHub repository` が <https://github.com/Tachaan/workshop-github-copilot-entry> を開く
- [ ] <http://127.0.0.1:8000/app/support-ticket-dashboard/> でアプリを開き、12件のチケットが表示される
