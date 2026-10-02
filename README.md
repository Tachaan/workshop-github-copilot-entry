# GitHub Copilot ハンズオン

> **既存コードの理解・仕様整理・ドキュメント化・リファクタリングから始める60分ワークショップ**

このリポジトリは、GitHub Copilotを業務で使い始める開発者向けの正式版教材です。Support Ticket Dashboardを題材に、Copilotへ依頼し、回答や変更を実ファイル・仕様・差分・テスト・画面動作で人が検証する流れを60分で体験します。

- **形式**: ハンズオンワークショップ
- **時間**: 60分
- **対象**: GitHub Copilotをこれから業務で活用したい開発者・エンジニア
- **演習アプリ**: `index.html`
- **初期データ**: 架空のサポートチケット12件

> [!IMPORTANT]
> 機密情報、認証情報、個人情報、未公開の顧客情報をCopilotのプロンプトへ入力しないでください。Copilotの出力は候補として扱い、採用前に必ず人が確認します。

## ローカルで実行する

Node.js 20.12.0以上を用意し、リポジトリのルートで実行します。

```bash
npm test
npm run app
```

- Dashboard: <http://127.0.0.1:8000/>

## アジェンダ

| Session | 時間 | 主題 |
| --- | ---: | --- |
| Overview | 5 min | ゴール、環境、教材とDashboardの準備 |
| Q0 | 5 min | GitHub Copilot利用の最初の一歩 |
| Q1 | 15 min | 既存コードをGitHub Copilotで理解する |
| Q2 | 15 min | 仕様を整理し、ドキュメント化する |
| Q3 | 15 min | 既存コードを安全にリファクタリングする |
| Q4 | 5 min | 振り返りと次の一歩 |
| **合計** | **60 min** |  |

受講者向け手順の正本は[`handson/`](handson/README.md)です。

## リポジトリ構成

| パス | 用途 |
| --- | --- |
| `handson/` | OverviewとQ0〜Q4の受講者向け教材 |
| `index.html`、`app.js`、`data.js`、`styles.css` | 演習用Dashboard |
| `docs/app-spec.md` | Dashboardの仕様書 |
| `templates/prompt-examples.md` | 演習で再利用するプロンプト例 |
| `tests/` | Dashboardのベースラインテスト |

## 単一リポジトリでの配布

教材、演習アプリ、仕様、テストをこのリポジトリにまとめています。このリポジトリをTemplate repositoryとして設定し、受講者が自分のOwner配下へ複製して利用する前提です。

## ライセンス

[MIT License](LICENSE)

Copyright (c) 2026 Tachaan.
