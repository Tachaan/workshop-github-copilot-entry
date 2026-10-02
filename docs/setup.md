# Workshop 事前準備・環境確認

このガイドは、GitHub Copilot Entry Workshopを始める前の環境確認用です。
このWorkshopは、正式公開後にこのリポジトリ自体をTemplate repositoryとして利用し、自分の演習用リポジトリを作成して進めることを基本とします。

- **基本構成**: 自分のPCにVS Code、Git、Node.jsを準備します。
- **代替構成**: 講師から案内がある場合のみ、Codespacesを利用できます。

## 1. 共通の準備

### GitHub アカウント

1. [GitHub](https://github.com/) にアクセスします。
2. Workshop で使うアカウントでサインインできることを確認します。
3. Workshop 用リポジトリをブラウザーで開けることを確認します。

パスワードや多要素認証の問題がある場合は、Workshop 当日までに解決しておきます。

### GitHub Copilotプランを確認（必須）

GitHubにサインインし、受講に使うアカウントでGitHub Copilot Chatを利用できるプランが有効になっていることを確認します。GitHub Copilot Free、Student、Pro、Pro+、Maxなどが対象です。プランごとに利用上限が異なるため、演習中に利用できる状態か事前に確認してください。詳細は[GitHub Copilotのプラン](https://docs.github.com/en/copilot/get-started/plans)を参照してください。

[画面付きのVS Codeサインイン手順](./vscode-sign-in.md)を開き、GitHub認証からCopilot Chatの応答確認までを完了します。

VS Code または Codespaces では、次の手順で実際に確認できます。

1. VS Code のステータスバーに Copilot アイコンが表示されていることを確認します。
2. Copilot アイコンを選び、無効やサインイン要求が表示されていないことを確認します。
3. Copilot Chat を開き、`このワークスペースについて教えて` などの簡単な質問を送ります。
4. 応答が返れば、Copilot を利用できます。

利用不可、無効、サインイン要求などが表示された場合は、使用中の GitHub アカウントと Copilot の利用可否を確認してください。

### VS Code と GitHub Copilot 拡張機能

#### Codespaces を使う場合

Codespace をブラウザーで開くと VS Code が起動するため、ローカルへの VS Code のインストールは不要です。拡張機能ビューで **GitHub Copilot** がインストール済みかつ有効になっていることを確認します。見つからない場合は、拡張機能ビューからインストールします。

#### ローカル環境を使う場合

1. [Visual Studio Code](https://code.visualstudio.com/) をインストールし、起動します。
2. 拡張機能ビューで **GitHub Copilot** を検索します。
3. GitHub が公開元であることを確認してインストールし、無効になっている場合は有効にします。
4. 更新が表示されている場合は、VS Code と拡張機能を更新します。

### VS Code から GitHub へサインイン

1. VS Code のアカウントメニューを開きます。
2. **GitHub でサインイン**を選択します。
3. ブラウザーに表示される認証手順を完了します。
4. VS Code に戻り、Workshop で使う GitHub アカウントが表示されることを確認します。
5. Copilot Chat を開き、Copilot の確認手順をもう一度実行します。

ブラウザーと VS Code で異なる GitHub アカウントを使っていないか注意してください。

### 演習用リポジトリを作成

[画面付きの演習用リポジトリ作成手順](./create-workshop-repository.md)を開き、正式公開時にTemplate repositoryとして設定される
[`Tachaan/workshop-github-copilot-entry`](https://github.com/Tachaan/workshop-github-copilot-entry)
から、受講に使う自分の個人Owner配下へリポジトリを作成します。Organizationへの作成は不要です。

作成画面ではCopilotのJumpstart欄を空欄にし、テンプレートの初期状態を保ったままローカルへcloneします。

## 2. Codespaces を利用する場合

Codespaces では開発環境がクラウド上に用意されます。

1. テンプレート設定後に作成した自分の演習用リポジトリを開きます。
2. **Code**、**Codespaces**、**Create codespace** の順に選択します。
3. Codespace の作成が完了し、ブラウザー版 VS Code が表示されるまで待ちます。
4. ファイル一覧とターミナルを開けることを確認します。
5. GitHub Copilot 拡張機能と Copilot Chat が利用できることを確認します。

Codespaces を使う場合、次の「ローカル環境を利用する場合」のインストール作業は不要です。作成できない場合は、Codespaces の利用可否と利用上限を確認してください。

## 3. ローカル環境を利用する場合

ローカル環境では、VS Code に加えて次のツールを準備します。各コマンドは VS Code のターミナルで実行し、バージョン情報が表示されれば確認完了です。

### Git

Git をインストールし、次のコマンドで確認します。

```text
git --version
```

Workshop 用リポジトリを取得できることも確認します。認証を求められた場合は、Workshop で使う GitHub アカウントで認証してください。

### Node.js

Dashboardの配信、ベースラインテスト、講師向けSlidevにNode.jsを使います。Pythonなど別のHTTPサーバーは不要です。ローカル環境にはNode.js 20.12.0以上を準備します。

[Node.js公式ダウンロードページ](https://nodejs.org/en/download)からLTS版をインストールします。Windowsで`winget`を利用できる場合は、PowerShellで次を実行しても構いません。

```powershell
winget install OpenJS.NodeJS.LTS
```

インストール後にPowerShellまたはVS Codeを開き直し、次のコマンドで確認します。

```text
node --version
npm --version
```

リポジトリのルートで次を実行し、すべてのテストが成功することを確認します。

```text
npm test
```

Dashboardは次のコマンドで起動します。

```text
npm run app
```

## 4. 開始前チェックリスト

### 全員

- [ ] Workshop で使う GitHub アカウントにサインインできる
- [ ] 指定のTemplate repositoryから、自分の個人Owner配下へWorkshop用リポジトリを作成した
- [ ] Workshop用リポジトリをブラウザーで開ける
- [ ] VS Code またはブラウザー版 VS Code を起動できる
- [ ] VS Code で正しい GitHub アカウントにサインインしている
- [ ] GitHub Copilot 拡張機能がインストール済みで有効になっている
- [ ] Copilot アイコンにエラーやサインイン要求が表示されていない
- [ ] Copilot Chat に簡単な質問を送り、応答を受け取れる

### Codespaces を使う人だけ

- [ ] Workshop 用リポジトリから Codespace を作成できる
- [ ] Codespace でファイル一覧とターミナルを開ける

### ローカル環境を使う人だけ

- [ ] `git --version` で Git のバージョンが表示される
- [ ] Node.js 20.12.0以上とnpmを利用できる
- [ ] `npm test`が成功する
- [ ] `npm run app`でDashboardを起動できる
- [ ] Workshop 用リポジトリをローカルに取得できる

## 5. うまくいかない場合

運営担当者へ相談するときは、次の情報を伝えると確認がスムーズです。パスワード、アクセストークン、認証コードなどの秘密情報は共有しないでください。

- Codespaces とローカル環境のどちらを使っているか
- OS とそのバージョン（ローカル環境の場合）
- VS Code のバージョン
- GitHub Copilot 拡張機能のバージョン
- 問題が起きた手順
- 画面に表示されたエラーメッセージ（秘密情報を除く）
- Copilot アイコンの状態
- GitHub と VS Code で同じアカウントにサインインしているか
- `git --version` など、該当する確認コマンドの結果

GitHub Copilotのプランが有効でも応答を受け取れない場合は、利用上限、サインイン中のGitHubアカウント、拡張機能の状態を確認してから運営担当者へ相談してください。
