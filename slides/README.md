# GitHub Copilot Entry Workshop — Slidev

S1-S5の講師進行用スライドです。受講者向け手順の正本は`handson/`配下にあり、このデッキは60分で投影しやすいように要点を圧縮しています。

デザインは、pptx-factoryの`2026 GitHub Presentation Template`と、そのSlidev再現カタログを基準にしています。GitHubのダーク背景、余白、タイポグラフィ、グリーン罫線、OctocatフッターをSlidev向けに再構成しています。

## 前提

- Node.js 20.12.0以上
- npm

## 起動

リポジトリのルートで実行します。

```bash
npm ci
npm run slides
```

Slidevがブラウザーを開きます。通常は <http://localhost:3030/> です。

## 講師向け操作

| 操作 | キー |
| --- | --- |
| 次へ / 前へ | `Space` / 矢印キー |
| Presenter Mode | `P` |
| Overview | `O` |
| Drawing | `D` |
| Dark Mode | `T` |

各スライド末尾のHTMLコメントに、時間配分と進行メモを記載しています。Presenter Modeでノートを確認できます。冒頭の前提確認1枚、サインイン2枚、リポジトリ作成2枚は一続きのPre-workで、60分の本編時間には含めません。

## ビルドとPDF出力

```bash
npm run slides:build
npm run slides:export
```

- 静的サイト: `dist/slidev/`
- PDF: `dist/github-copilot-entry-workshop.pdf`

PDF出力には`playwright-chromium`を使用します。

## 更新ルール

1. 受講者の操作手順を変える場合は、先に`handson/`配下を更新します。
2. 次に`slides/slides.md`の該当スライドと発表ノートを同期します。
3. 画像は`assets/screenshots/`へ追加し、スライドから`/screenshots/<ファイル名>`で参照します。Slidev専用のブランド素材は`assets/slidev/`へ置きます。
4. `npm run slides:build`と`npm run slides:export`で表示を確認します。
