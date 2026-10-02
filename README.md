# GitHub Copilot ハンズオン

> **既存コードの理解・仕様整理・ドキュメント化・リファクタリングから始める60分ワークショップ**

このリポジトリは、GitHub Copilotを業務で使い始める開発者向けの正式版教材です。Support Ticket Dashboardを題材に、Copilotへ依頼し、回答や変更を実ファイル・仕様・差分・テスト・画面動作で人が検証する流れを60分で体験します。

- **形式**: ハンズオンワークショップ
- **時間**: 60分
- **対象**: GitHub Copilotをこれから業務で活用したい開発者・エンジニア
- **教材サイト**: `index.html`
- **演習アプリ**: `app/support-ticket-dashboard/`
- **初期データ**: 架空のサポートチケット12件

> [!IMPORTANT]
> 機密情報、認証情報、個人情報、未公開の顧客情報をCopilotのプロンプトへ入力しないでください。Copilotの出力は候補として扱い、採用前に必ず人が確認します。

## ローカルで実行する

Node.js 20.12.0以上を用意し、リポジトリのルートで実行します。

```bash
npm ci
npm test
npm run app
```

- 教材サイト: <http://127.0.0.1:8000/>
- Dashboard: <http://127.0.0.1:8000/app/support-ticket-dashboard/>

詳細は[ローカルプレビュー手順](docs/local-preview.md)を参照してください。

## アジェンダ

| Session | 時間 | 主題 |
| --- | ---: | --- |
| Overview | 5 min | ゴール、環境、教材サイトとDashboardの準備 |
| S1 | 5 min | GitHub Copilot利用の最初の一歩 |
| S2 | 15 min | 既存コードをGitHub Copilotで理解する |
| S3 | 15 min | 仕様を整理し、ドキュメント化する |
| S4 | 15 min | 既存コードを安全にリファクタリングする |
| S5 | 5 min | 振り返りと次の一歩 |
| **合計** | **60 min** |  |

受講者向け手順の正本は[`handson/`](handson/README.md)です。

## 講師投影スライド

Slidevの起動、ビルド、PDF出力には次の標準スクリプトを使います。

```bash
npm run slides
npm run slides:build
npm run slides:export
```

- 静的サイト: `dist/slidev/`
- PDF: `dist/github-copilot-entry-workshop.pdf`
- 更新手順: [Slidevガイド](slides/README.md)

## リポジトリ構成

| パス | 用途 |
| --- | --- |
| `index.html` | 60分教材サイトの入口 |
| `handson/` | OverviewとSession 1〜5の受講者向け教材 |
| `app/support-ticket-dashboard/` | 演習用Dashboard |
| `docs/` | アプリ仕様、事前準備、補足資料 |
| `templates/prompt-examples.md` | 演習で再利用するプロンプト例 |
| `slides/` | 講師投影用Slidev |
| `facilitator/` | 60分版の講師進行ガイド |
| `tests/` | Dashboardのベースラインテスト |
| `scripts/` | ローカルサーバー |
| `assets/` | 教材サイト、スクリーンショット、Slidev資材 |

## 単一リポジトリでの配布

教材、演習アプリ、テスト、スライドをこのリポジトリにまとめています。正式公開時には、このリポジトリ自体をTemplate repositoryとして設定し、受講者が自分のOwner配下へ複製する前提です。Template repository設定、Public化、GitHub Pages有効化、公開URL確認はリポジトリ管理者が別途実施します。

## ライセンス

| 対象 | ライセンス |
| --- | --- |
| ドキュメント、スライド、図版、スクリーンショット | [CC BY 4.0](LICENSE) |
| コードサンプル、テスト、サイト資材、Slidevコード | [MIT](LICENSE-CODE) |

Copyright (c) Microsoft Corporation.
