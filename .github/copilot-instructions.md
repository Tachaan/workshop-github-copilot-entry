# Copilot instructions

このリポジトリは、GitHub Copilotを業務で使い始める開発者向けの日本語60分ハンズオン教材です。教材、演習アプリ、仕様、テスト、スライドを単一リポジトリで管理します。

## 教材の前提

- 本文、見出し、例、メッセージは日本語で書く。
- 受講者向け手順の正本は`handson/`、表示順の正本は`assets/site.config.js`とする。
- セッション表示はOverviewとS1-S5、本文見出しはSession 1〜5とする。
- 60分の時間配分はOverview 5分、S1 5分、S2-S4各15分、S5 5分を維持する。
- Support Ticket Dashboardの初期データ12件と、仕様書と実装を比較する演習意図を維持する。
- Copilotの回答や変更は候補として扱い、実ファイル、仕様、差分、テスト、画面動作を人が確認する流れを必ず含める。
- 機密情報、認証情報、個人情報、未公開の顧客情報をプロンプトへ入力しないよう明記する。

## 単一リポジトリ方針

- 教材と演習アプリを別リポジトリへ分離しない。
- 受講者は、正式公開後にこのリポジトリ自体をTemplate repositoryとして複製する前提で案内する。
- Public化、Template repository設定、GitHub Pages有効化、公開URLはGitHub側の運用作業として扱い、コード変更だけで完了したと記載しない。

## 同期対象

受講者の操作、セッション名、時間配分を変更するときは、次を同期する。

- `handson/`
- `assets/site.config.js`
- `templates/prompt-examples.md`
- `slides/slides.md`
- `slides/README.md`
- `docs/workshop-plan.md`
- `facilitator/facilitator-guide.md`
- `README.md`

## 変更後の確認

- `npm test`
- `npm run slides:build`
- `npm run app`で`index.html`と`app/support-ticket-dashboard/`を確認
- リンク、画像、ファイルパス、セッション番号を確認
- 変更に無関係な差分がないことを確認
