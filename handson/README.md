# GitHub Copilot ハンズオン

## 60分で「最初の一歩」を一巡する

この60分版では、Support Ticket Dashboardの既存コードを題材に、GitHub Copilotを使う基本サイクルを60分で体験します。

1. 対象と目的を明確にしてCopilotへ依頼する
2. 回答を実ファイルと照合する
3. 仕様と実装の差分を整理する
4. 変更前の動作を確認してから小さく編集する
5. 差分と実行結果を人が確認する

> [!IMPORTANT]
> Copilotの回答や変更は候補です。存在するファイル、実際のコード、仕様書、画面動作を自分で確認してから採用します。

## 受講前提

| 項目 | 必須条件 |
| --- | --- |
| GitHub | GitHubアカウントがあり、案内されたテンプレートから自分の演習用リポジトリを作成できる |
| GitHub Copilot | エディターからGitHub Copilot Chatへ質問できるプランを利用している |
| ローカル環境 | エディター、Git、Node.js 20.12.0以上、npmを利用できる |

> [!IMPORTANT]
> GitHub Copilot Free、Student、Pro、Pro+、Maxなど、**GitHub Copilot Chatを利用できるプランが必須**です。プランごとに利用上限が異なるため、受講前にChatへ質問を送り、演習中に使える状態であることを確認してください。詳細は[GitHub Copilotのプラン](https://docs.github.com/en/copilot/get-started/plans)を参照してください。

受講開始前に、VS Codeで受講用GitHubアカウントへサインインし、Copilot Chatへ簡単な質問を送って応答を受け取れることを確認します。
指定のPublic templateから自分の個人Owner配下へ演習用リポジトリを作成し、ローカルへcloneします。

Dashboardはブラウザーで動く静的なWebアプリです。Node.jsは`npm run app`でファイルを配信し、`npm test`で変更前後の動作を自動確認するために使います。

### Node.jsを準備する

[Node.js公式ダウンロードページ](https://nodejs.org/en/download)からLTS版をインストールします。`winget`を利用できる場合は、PowerShellで次を実行しても構いません。

```powershell
winget install OpenJS.NodeJS.LTS
```

インストール後にPowerShellまたはエディターを開き直し、リポジトリのルートで確認します。

```powershell
node --version
npm --version
npm test
```

`node --version`が`v20.12.0`以上で、テストがすべて成功すれば準備完了です。

## 受講開始前の準備

> [!IMPORTANT]
> 教材は`handson/`のMarkdownで読み進め、Dashboardはこのリポジトリを元に作成した演習用リポジトリから起動します。

### 1. このリポジトリから演習用リポジトリを作成する

正式公開後にTemplate repositoryとなる[`Tachaan/workshop-github-copilot-entry`](https://github.com/Tachaan/workshop-github-copilot-entry)から、自分の個人Owner配下へリポジトリを作成します。**Use this template**、**Create a new repository**の順に選択し、Privateを推奨、JumpstartのPromptは空欄、Include all branchesはOffのままにします。作成したリポジトリをローカルへcloneし、エディターで開きます。

### 2. 教材アプリのDashboardを起動する

ローカル環境では、リポジトリのルートをエディターで開き、ターミナルで実行します。

```bash
npm run app
```

ブラウザーで<http://127.0.0.1:8000/>を開きます。

サーバーを実行したターミナルは閉じず、Q0以降のコマンドは別のターミナルで実行します。

> [!NOTE]
> Dashboardには、仕様書と実装を比較するための差分候補が含まれます。12件表示され、操作時にエラーが出なければ起動成功です。Q2で根拠を整理するまで、気づいた差分を先回りして修正しないでください。

起動できない場合は、Node.jsのバージョン、実行中のポート、コマンドを実行したディレクトリを確認します。

## この60分版で扱う主題

| Session | Time | 主題 |
| --- | ---: | --- |
| Overview | 5 min | ゴール、環境、教材とDashboardの準備 |
| Q0 | 5 min | GitHub Copilot利用の最初の一歩 |
| Q1 | 15 min | 既存コードをGitHub Copilotで理解する |
| Q2 | 15 min | 仕様の整理、ドキュメント化 |
| Q3 | 15 min | 既存コードのリファクタリング |
| Q4 | 5 min | 振り返りと次の一歩 |
| **合計** | **60 min** | **Workshop** |

## 開始前チェック

- [ ] この教材を元に作成した自分のリポジトリをローカルで開いた
- [ ] 利用中のGitHub Copilotプランで、Copilot Chatへ質問を送って応答を受け取れた
- [ ] Node.js 20.12.0以上とnpmを利用でき、`npm test`が成功する
- [ ] `npm run app`でDashboardを起動した
- [ ] Dashboardに12件表示される

## 今日のゴール

- [ ] 既存コードの処理をCopilotへ質問し、根拠を実ファイルで確認できる
- [ ] 仕様書と実装の差分を、事実と要確認事項に分けられる
- [ ] リファクタリング前後の動作と差分を確認できる
- [ ] Copilotの出力を人が検証して採用すると説明できる
