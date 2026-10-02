---
theme: default
title: GitHub Copilot Entry — Workshop
info: |
  Support Ticket Dashboardを題材に、既存コード理解、仕様整理、
  ドキュメント化、安全なリファクタリングを60分で体験します。
author: GitHub Copilot Entry Workshop
colorSchema: dark
aspectRatio: 16/9
canvasWidth: 1280
transition: slide-left
mdc: true
drawings:
  persist: false
selectable: true
class: cover-slide
---

<div class="cover-code">GitHub Copilot Fundamentals · Workshop</div>

# GitHub Copilot Entry

<p class="subtitle">既存コードの理解から始める 60分 Workshop</p>

<div class="chip-row">
  <span class="chip">S1 最初の一歩</span>
  <span class="chip">S2 コード理解</span>
  <span class="chip">S3 仕様・文書</span>
  <span class="chip">S4 リファクタリング</span>
  <span class="chip">S5 次の一歩</span>
</div>

<div class="hero-stat">
  <div><b>60</b><span>minutes</span></div>
</div>

<!--
開始前:
- 次の5枚はWorkshop開始前のPre-workです。前提確認1枚、サインイン2枚、リポジトリ作成2枚は、60分の本編時間には含めません。
- Web教材、Dashboard、VS Code、Copilot Chatが開いていることを確認します。
- このデッキは講師投影用です。受講者はWeb教材を見ながら操作します。
-->

---
layout: default
class: prework-slide
---

<div class="kicker">Pre-work / Prerequisites</div>

# 受講前に使う環境とツールを確認する

<div class="grid-3">
  <div class="card accent">
    <div class="card-index">01 / EDITOR</div>
    <h3>VS Code + Copilot Chat</h3>
    <p>Copilot Chatを利用できるプランでサインインします。</p>
  </div>
  <div class="card">
    <div class="card-index">02 / SOURCE</div>
    <h3>Git</h3>
    <p>取得・ブランチ作業・差分確認に使います。</p>
  </div>
  <div class="card warning">
    <div class="card-index">03 / APP + TEST</div>
    <h3>Node.js 20.12.0+</h3>
    <p><code>npm run app</code>と<code>npm test</code>に使います。</p>
  </div>
</div>

<div class="callout">Copilot Free / Student / Pro / Pro+ / Maxなど、Chatを利用できるプランが必要です。</div>

<div class="setup-flow">
  <span>Copilot Chatの応答</span><i>✓</i><span>node --version</span><i>✓</i><span>npm --version</span>
</div>

<!--
Workshop開始前（60分に含めない）
- このスライドから受講前のPre-workを開始します。
- Node.jsをDashboardの配信とテストの両方に使うと説明します。
- Copilot Chatの応答、node --version、npm --versionを確認してから、次のサインイン確認へ進みます。
-->

---
layout: default
class: prework-slide
---

<div class="kicker">Pre-work / Sign in 1 of 2</div>

# VS CodeからGitHub認証を始める

<div class="signin-grid signin-start">
  <div class="signin-step accent">
    <div class="card-index">01 / VS CODE</div>
    <h3>Continue with GitHub</h3>
    <p>ステータスバーのCopilotマークを選び、GitHub認証を開始します。</p>
    <img src="/screenshots/vscode-copilot-sign-in-dialog.png" class="screenshot" alt="VS CodeでContinue with GitHubを選択する画面">
  </div>
  <div class="signin-step">
    <div class="card-index">02 / BROWSER</div>
    <h3>受講用アカウントでサインイン</h3>
    <p>Copilot Chatを利用できるGitHubアカウントを使います。</p>
    <img src="/screenshots/vscode-github-sign-in.png" class="screenshot" alt="GitHubのサインイン画面">
  </div>
</div>

<div class="callout warning">ブラウザーとVS Codeで別のGitHubアカウントを使わないでください。</div>

<!--
Workshop開始前（60分に含めない）
- 60分版Web教材の左ナビにある「Sign in」を開いてもらいます。
- Copilotマークが見つからない場合は、ステータスバー表示とGitHub Copilot拡張機能を確認します。
-->

---
layout: default
class: prework-slide
---

<div class="kicker">Pre-work / Sign in 2 of 2</div>

# AuthorizeしてCopilot Chatを確認する

<div class="signin-grid signin-authorize">
  <div class="signin-step accent">
    <div class="card-index">03 / AUTHORIZE</div>
    <h3>アカウントを確認してContinue</h3>
    <p>表示中のアカウントが受講用であることを確認します。</p>
    <img src="/screenshots/vscode-github-authorize.png" class="screenshot" alt="Authorize Visual Studio Code画面">
  </div>
  <div class="signin-step">
    <div class="card-index">04 / RETURN</div>
    <h3>VS Codeへ戻る</h3>
    <p>ブラウザーからVisual Studio Codeを開く操作を許可します。</p>
    <img src="/screenshots/vscode-return-to-app.png" class="screenshot" alt="Visual Studio Codeへ戻る画面">
  </div>
</div>

<div class="signin-check">
  <span>05 / VERIFY</span>
  <b>Copilot Chatへ簡単な質問を送り、応答を受け取れれば準備完了</b>
</div>

<!--
Workshop開始前（60分に含めない）
- Authorize画面ではアカウント名を声に出さず、本人に確認してもらいます。
- VS Codeへ戻ったら、60分版のSign inページにある確認プロンプトを送ります。
- サインイン要求、利用権限エラー、利用上限エラーがないことまで確認します。
-->

---
layout: default
class: prework-slide
---

<div class="kicker">Pre-work / Repository 1 of 2</div>

# 公開テンプレートから作成を始める

<div class="repository-template-grid">
  <div class="repository-instructions">
    <div class="card-index">SOURCE TEMPLATE</div>
    <h3><a href="https://github.com/Tachaan/workshop-github-copilot-entry" target="_blank" rel="noopener noreferrer">Tachaan/workshop-github-copilot-entry</a></h3>
    <p>指定のPublic templateを開き、右上のボタンから作成画面へ進みます。</p>
    <div class="repository-action">
      <b>Use this template</b>
      <span>→</span>
      <b>Create a new repository</b>
    </div>
    <div class="callout warning">Forkではなく、<b>Use&nbsp;this&nbsp;template</b>を使います。</div>
  </div>
  <img src="/screenshots/repository-template-use-this-template.png" class="screenshot repository-template-shot" alt="公開テンプレートでUse this templateを選択する画面">
</div>

<!--
Workshop開始前（60分に含めない）
- 60分版Web教材の左ナビにある「Repository」を開いてもらいます。
- URLが https://github.com/Tachaan/workshop-github-copilot-entry で、Public template表示があることを確認します。
- Use this templateからCreate a new repositoryへ進みます。
-->

---
layout: default
class: prework-slide
---

<div class="kicker">Pre-work / Repository 2 of 2</div>

# 自分の個人Owner配下に作成する

<div class="repository-create-grid">
  <div class="repository-checks">
    <div><span>01 / OWNER</span><b>受講に使う自分の個人アカウント</b></div>
    <div><span>02 / NAME</span><b>workshop-github-copilot-entry-workshop</b></div>
    <div><span>03 / VISIBILITY</span><b>Privateを推奨</b></div>
    <div><span>04 / COPILOT</span><b>JumpstartのPromptは空欄</b></div>
    <div class="accent"><span>05 / CREATE</span><b>Create repository</b></div>
  </div>
  <img src="/screenshots/repository-template-create-repository.png" class="screenshot repository-create-shot" alt="自分のOwner配下へ演習用リポジトリを作成する画面">
</div>

<div class="callout warning">Organizationへの作成は不要です。Include all branchesはOffのままにします。</div>

<!--
Workshop開始前（60分に含めない）
- OwnerはTachaanではなく、受講者本人の個人アカウントを選択します。
- CopilotのJumpstart欄へ入力すると生成ファイルやPRが追加されるため、空欄にします。
- 作成後のURLに本人のアカウント名が含まれることを確認し、ローカルへcloneします。
-->

---
layout: default
---

<div class="kicker">Outcome</div>

# 今日のゴール

<div class="grid-3">
  <div class="card accent">
    <div class="card-index">01 / UNDERSTAND</div>
    <h3>既存コードを理解する</h3>
    <p>Copilotの説明を、ファイル・関数・画面で照合する。</p>
  </div>
  <div class="card">
    <div class="card-index">02 / ORGANIZE</div>
    <h3>仕様を整理する</h3>
    <p>事実、差分候補、要確認事項を分ける。</p>
  </div>
  <div class="card">
    <div class="card-index">03 / CHANGE SAFELY</div>
    <h3>小さく安全に変更する</h3>
    <p>変更前後をテスト・差分・画面動作で確認する。</p>
  </div>
</div>

<div class="flow">
  <div class="flow-step"><b>質問する</b><small>対象と目的を明示</small></div>
  <div class="flow-step"><b>照合する</b><small>実ファイルへ戻る</small></div>
  <div class="flow-step"><b>整理する</b><small>事実と判断を分離</small></div>
  <div class="flow-step"><b>小さく変える</b><small>範囲を固定</small></div>
  <div class="flow-step"><b>再確認する</b><small>テストと差分</small></div>
</div>

<!--
0:00-0:01
- Copilotに全部任せる講座ではなく、人が確認しながら使う基本サイクルの練習だと説明します。
-->

---
layout: default
---

<div class="kicker">Agenda</div>

# 60分のロードマップ

<div class="agenda">
  <div class="agenda-item">
    <span class="agenda-time">5 min</span>
    <b>Overview</b>
    <span>ゴール・環境・起動確認</span>
  </div>
  <div class="agenda-item">
    <span class="agenda-time">5 min</span>
    <b>S1</b>
    <span>最初の質問と回答の照合</span>
  </div>
  <div class="agenda-item">
    <span class="agenda-time">15 min</span>
    <b>S2</b>
    <span>既存コードを理解</span>
  </div>
  <div class="agenda-item">
    <span class="agenda-time">15 min</span>
    <b>S3</b>
    <span>仕様と実装の差分を整理</span>
  </div>
  <div class="agenda-item">
    <span class="agenda-time">15 min</span>
    <b>S4</b>
    <span>テストで守って小さく変更</span>
  </div>
  <div class="agenda-item">
    <span class="agenda-time">5 min</span>
    <b>S5</b>
    <span>振り返り</span>
  </div>
</div>

<div class="callout">完璧な回答より、質問 → 照合 → 修正 → 再確認を一巡することを優先します。</div>

<!--
0:01-0:02
- OverviewとS1-S5の時間配分を共有します。
- 時間が押した場合も、S4の変更前後確認は省略しません。
-->

---
layout: default
---

<div class="kicker">Before Start</div>

# Support Ticket Dashboardを起動する

<div class="card accent">
  <div class="card-index">WORKSHOP APP</div>
  <h3>Support Ticket Dashboard</h3>
  <p>公開テンプレートから作成した自分のリポジトリをローカルで起動します。</p>
</div>

<div class="setup-flow">
  <span>自分のRepository</span><i>→</i><span>clone</span><i>→</i><span>npm test</span><i>→</i><span>npm run app</span>
</div>

```bash
# Local: repository root
npm run app
```

<div class="callout warning">Dashboardに12件表示され、検索・絞り込みを操作できれば準備完了です。</div>

<!--
0:02-0:05
- アプリは指定の公開テンプレートから作成した自分のリポジトリで開くことを明確にします。
- サーバー用ターミナルは閉じず、操作用に別ターミナルを開いてもらいます。
- npm testの成功とDashboardの12件表示までをここで確認して、S1へ進みます。
-->

---
layout: section
class: section-slide
---

<div>
  <span class="session-chip">S1</span>
  <h1>GitHub Copilot利用の<br>最初の一歩</h1>
  <p class="lead">対象・目的・制約・出力形式を渡し、回答を実ファイルで確認します。</p>
</div>

<div class="session-time">5 min</div>

<!--
0:05
- S1開始。Dashboard 12件とnpm test成功はOverviewで確認済みです。
-->

---
layout: default
---

<div class="kicker">S1 / Prompt Design</div>

# 良い依頼は4点セット

<div class="grid-4">
  <div class="card accent">
    <div class="card-index">TARGET</div>
    <h3>対象</h3>
    <p>`#file:.../app.js`</p>
  </div>
  <div class="card">
    <div class="card-index">PURPOSE</div>
    <h3>目的</h3>
    <p>初心者向けに役割を説明する</p>
  </div>
  <div class="card">
    <div class="card-index">CONSTRAINT</div>
    <h3>制約</h3>
    <p>まだコードを変更しない</p>
  </div>
  <div class="card">
    <div class="card-index">FORMAT</div>
    <h3>出力形式</h3>
    <p>入力・処理・出力の3項目</p>
  </div>
</div>

<div class="callout">関数ごとの説明とコード上の根拠を求めると、確認可能な回答になりやすくなります。</div>

<!--
0:05-0:06
- 曖昧な「このコードを説明して」では、モデルによって主要関数が省略されることを説明します。
- 関数名は先に与えず、ファイル内の関数を見つけて個別に説明させます。
-->

---
layout: default
class: dense
---

<div class="kicker">S1 / First Prompt</div>

# 最初のプロンプトを送る

<div class="split wide-right">
  <div>
    <img src="/screenshots/s1-copilot-chat-ready.png" class="screenshot compact" alt="Copilot Chat入力欄">
    <p class="image-caption">Copilot Chatへ対象ファイルを追加</p>
  </div>
  <div>

```text
#file:app/support-ticket-dashboard/app.js

このファイルがSupport Ticket Dashboardで受け持つ役割を、
初心者向けに1〜2文で説明してください。

1. 画面から受け取る入力
2. 主な処理
3. 画面へ返す出力

「主な処理」では、このファイル内でfunctionとして
定義されている関数を見つけ、関数ごとに名前と役割を
1〜2文で説明してください。
何を受け取り、何を処理し、結果をどこで使うかと、
根拠となる変数名、関数名、DOM要素のIDを含めてください。
まだコードは変更しないでください。
```

  </div>
</div>

<!--
0:06-0:09
- 参加者にプロンプトを実行してもらいます。
- 回答に挙がった関数をapp.jsで検索し、実在するか確認します。
-->

---
layout: default
---

<div class="kicker">S1 / Verify</div>

# 回答を実ファイルで照合する

<div class="split">
  <div>
    <ul class="check-list">
      <li>ファイル全体の役割が実際の処理と一致する</li>
      <li>回答に挙がった関数が実在する</li>
      <li>各関数の入力・処理・利用先がコードと一致する</li>
      <li>検索・ステータス・並び順の変数とDOM IDが一致する</li>
    </ul>
  </div>
  <div class="card accent">
    <div class="card-index">CHECKPOINT</div>
    <h3>コードで確かめる</h3>
    <p><strong>関数ごと</strong>に入力・処理・利用先を確認する。</p>
    <p><strong>画面との接点</strong>になる変数とDOM IDを確認する。</p>
    <div class="callout">回答の自然さではなく、コード上の根拠で判定します。</div>
  </div>
</div>

<!--
0:09-0:10
- S1完了。説明から漏れた関数があれば、対象を絞って追加質問します。
-->

---
layout: section
class: section-slide
---

<div>
  <span class="session-chip">S2</span>
  <h1>既存コードを<br>Copilotで理解する</h1>
  <p class="lead">アプリの入口、主要ファイル、検索・絞り込み・描画の流れを追います。</p>
</div>

<div class="session-time">15 min</div>

<!--
0:10
- ここから変更前のコード理解です。まだ編集しません。
-->

---
layout: default
---

<div class="kicker">S2 / Architecture</div>

# まず4ファイルの責務をつなぐ

<div class="file-map">
  <div class="file-node">
    <code>index.html</code>
    <p>画面要素とJavaScriptの読み込み順</p>
  </div>
  <div class="file-node">
    <code>data.js</code>
    <p>12件のチケットと補助項目</p>
  </div>
  <div class="file-node">
    <code>app.js</code>
    <p>検索、絞り込み、並び替え、描画</p>
  </div>
  <div class="file-node">
    <code>app-spec.md</code>
    <p>期待される画面と動作</p>
  </div>
</div>

<div class="split mt-3">
  <div>
    <h3>問い</h3>
    <p class="lead">「どのファイルが、何を次へ渡すか？」</p>
  </div>
  <img src="/screenshots/s2-vscode-dashboard-files-and-spec.png" class="screenshot compact" alt="Dashboard主要ファイル">
</div>

<!--
0:10-0:13
- Explorerで4ファイルを開かせます。
- ファイルを単独で読むのではなく、データの流れとしてつなぐことを強調します。
-->

---
layout: default
class: dense
---

<div class="kicker">S2 / Workspace Prompt</div>

# リポジトリ全体の関係を質問する

<div class="split wide-right">
  <div>

```text
@workspace Support Ticket Dashboardが表示されるまでの
流れを説明してください。

index.html、data.js、app.js、docs/app-spec.mdを対象に、
「ファイル」「役割」「次に渡すデータ」の3列の表で
回答してください。

internalMemoの具体値は引用・要約・出力せず、
項目名と扱いだけを確認してください。

まだコードは変更せず、
推測と確認できた事実を分けてください。
```

  </div>
  <div>
    <img src="/screenshots/s2-workspace-answer-source-compare.png" class="screenshot" alt="Copilot回答とコードの照合">
    <p class="image-caption">回答に出たファイルを自分で開いて照合</p>
  </div>
</div>

<!--
0:13-0:18
- プロンプトを実行します。
- @workspaceの回答範囲が広い場合は、4ファイルへ対象を戻します。
- internalMemoの具体値が回答に含まれた場合は、採用せずプロンプトを修正します。
-->

---
layout: default
---

<div class="kicker">S2 / Narrow the Scope</div>

# `filterTickets`を処理順に分解する

<div class="flow">
  <div class="flow-step"><b>入力</b><small>検索・status・sort</small></div>
  <div class="flow-step"><b>検索</b><small>buildSearchText</small></div>
  <div class="flow-step"><b>絞り込み</b><small>status</small></div>
  <div class="flow-step"><b>並び替え</b><small>calc</small></div>
  <div class="flow-step"><b>描画</b><small>count + cards</small></div>
</div>

<div class="grid-2 mt-3">
  <div class="prompt-panel">
    <div class="prompt-label">Inline Chat</div>
    <p class="prompt-step">app.jsの<code>filterTickets</code>関数全体を選択してから実行</p>
    <p>/explain この関数を、入力、検索、ステータス絞り込み、並び替え、件数更新、描画の順に説明してください。</p>
    <p>検索では、入力値を検索用に整える処理と検索対象項目を明示してください。</p>
    <p>各説明に対応するコードを示してください。</p>
  </div>
  <div class="card accent">
    <div class="card-index">VERIFY</div>
    <p>入力値の前処理、検索対象、絞り込み条件、並び替え、DOM更新を実コードで照合します。</p>
  </div>
</div>

<!--
0:18-0:25
- app.jsを開き、filterTickets関数全体を選択してからInline Chatを開きます。
- 選択範囲がないと関数以外まで説明されるため、選択操作を必ず見せます。
- 説明に含まれない処理があれば、実コードを根拠に追加質問します。
-->

---
layout: section
class: section-slide
---

<div>
  <span class="session-chip">S3</span>
  <h1>仕様を整理し、<br>ドキュメント化する</h1>
  <p class="lead">仕様と実装を比べ、事実・差分候補・判断事項を分離します。</p>
</div>

<div class="session-time">15 min</div>

<!--
0:25
- S2で理解したコードを、S3では仕様との比較材料にします。
-->

---
layout: default
---

<div class="kicker">S3 / Compare</div>

# 仕様と実装を同じ表で見る

<div class="grid-3">
  <div class="card accent">
    <div class="card-index">SPEC</div>
    <h3>仕様書の記述</h3>
    <p>利用者が期待する画面・検索・ソート・表示項目。</p>
  </div>
  <div class="card">
    <div class="card-index">IMPLEMENTATION</div>
    <h3>実装の根拠</h3>
    <p>ファイル、関数、条件式、DOM更新から確認できる事実。</p>
  </div>
  <div class="card warning">
    <div class="card-index">DECISION</div>
    <h3>差分 / 要確認</h3>
    <p>どちらが正しいかは自動で決めず、担当者へ確認する。</p>
  </div>
</div>

<div class="callout">見る観点: 検索対象 / ステータス表記 / ソート / 表示項目 / 期限切れ表示</div>

<!--
0:25-0:28
- 「実装が正」「仕様書が正」と先に決めないことを説明します。
- 根拠と判断を同じ列に混ぜないことがポイントです。
-->

---
layout: default
class: dense
---

<div class="kicker">S3 / Specification Prompt</div>

# 差分候補を3列で整理する

<div class="split wide-right">
  <div>

```text
#file:docs/app-spec.md
#file:app/support-ticket-dashboard/app.js

仕様書と実装を比較してください。
検索対象、ステータス表記、ソート、表示項目、
期限切れ表示について、
「仕様書の記述（行番号付き）」
「実装の根拠（ファイル名、関数名、行番号付き）」
「差分または要確認事項」の3列で整理してください。

internalMemoの具体値は引用・要約・出力せず、
項目名と扱いだけを確認してください。

まだファイルは変更せず、実装から確認できないことは
推測せず「要確認」としてください。
```

  </div>
  <div>
    <img src="/screenshots/s3-spec-discrepancy-prompt.png" class="screenshot" alt="仕様差分プロンプト">
  </div>
</div>

<!--
0:28-0:34
- プロンプトを実行し、回答の行番号を開いて仕様書・app.js・data.js・画面で確認します。
- 3つ以上の差分候補を見つけることが目的ですが、正解を決める必要はありません。
-->

---
layout: default
---

<div class="kicker">S3 / Human Decision</div>

# 出力を3つのレーンへ分ける

<div class="decision-lanes">
  <div class="decision fact">
    <div class="card-index">CONFIRMED FACT</div>
    <h3>確認できた事実</h3>
    <p>コードや画面で根拠を示せる。文書へ記載できる候補。</p>
  </div>
  <div class="decision diff">
    <div class="card-index">DIFFERENCE</div>
    <h3>差分候補</h3>
    <p>仕様と実装が一致しない。どちらを直すかは未決定。</p>
  </div>
  <div class="decision question">
    <div class="card-index">QUESTION</div>
    <h3>判断が必要</h3>
    <p>プロダクトオーナーや担当者へ確認する質問として残す。</p>
  </div>
</div>

<div class="callout warning"><strong>internalMemo</strong> は具体値を出力しない。項目名と安全な扱いだけを文書化します。</div>

<!--
0:34-0:40
- 仕様確認メモを「確認済み」「差分候補」「判断が必要」「次に確認する人」の見出しで作らせます。
- 根拠のない文は削除するか「要確認」に直します。
-->

---
layout: section
class: section-slide
---

<div>
  <span class="session-chip">S4</span>
  <h1>既存コードを<br>安全にリファクタリングする</h1>
  <p class="lead">変更前の動作を確認し、検索・絞り込みだけを小さく分離します。</p>
</div>

<div class="session-time">15 min</div>

<!--
0:40
- ここで初めてコード変更へ進みます。
-->

---
layout: default
---

<div class="kicker">S4 / Baseline</div>

# 変更前の4操作を確認する

<div class="split">
  <div>

```bash
npm test
```

<table class="baseline-table">
  <thead><tr><th>操作</th><th>期待結果</th></tr></thead>
  <tbody>
    <tr><td>初期状態</td><td>12件</td></tr>
    <tr><td>初期状態 → <code>API</code>検索</td><td>1件</td></tr>
    <tr><td>初期状態 → 対応中</td><td>4件</td></tr>
    <tr><td>初期状態 → 一致しない語</td><td>0件 + 空表示</td></tr>
  </tbody>
</table>

<p class="muted">各行は独立。次の行へ進む前に、検索・ステータス・並び順を初期状態へ戻します。</p>

  </div>
  <div>
    <img src="/screenshots/s4-dashboard-manual-baseline.png" class="screenshot" alt="Dashboard手動確認">
    <p class="image-caption">自動テスト + 手動確認の両方を残す</p>
  </div>
</div>

<!--
0:40-0:44
- npm testを実行します。
- 4操作は組み合わせず、毎回初期状態へ戻して独立に確認します。
- 変更後にも同じ4操作を繰り返すと伝えます。
-->

---
layout: default
class: dense
---

<div class="kicker">S4 / Small Change</div>

# 計画 → 適用 → 差分 → 再確認

<div class="grid-2">
  <div class="prompt-stack">
    <div class="prompt-panel">
      <div class="prompt-label">1. Plan first</div>
      <p>この関数の検索とステータス絞り込みを、純粋関数へ抽出する計画を作ってください。</p>
      <p>並び替え、件数更新、DOM描画、calcの計算ルールは変更しません。</p>
      <p>まず変更箇所、維持する挙動、確認手順だけを示し、まだ編集しないでください。</p>
    </div>
    <div class="prompt-panel">
      <div class="prompt-label">2. Then apply</div>
      <p>計画どおり、検索とステータス絞り込みだけを小さな関数へ抽出してください。</p>
      <p>既存の命名とJavaScriptの書き方に合わせ、無関係な変更はしないでください。</p>
    </div>
  </div>
  <div class="card accent">
    <div class="card-index">SCOPE</div>
    <h3>変更してよい</h3>
    <p>検索とステータス絞り込みの小さな関数分割。</p>
    <h3>変更しない</h3>
    <p>検索対象、ソート、<code>calc</code>、件数、DOM描画、画面デザイン。</p>
  </div>
</div>

<div class="flow refactor-flow">
  <div class="flow-step"><b>tests</b><small>npm test + 4操作</small></div>
  <div class="flow-step"><b>refactor</b><small>計画 → 適用</small></div>
  <div class="flow-step"><b>diff review</b><small>git diff</small></div>
  <div class="flow-step"><b>rerun tests</b><small>同じテストと4操作</small></div>
</div>

<!--
0:44-0:52
- まず計画だけ出させ、範囲を確認します。
- 計画で止めず、2つ目のプロンプトで実際に編集させ、直せるところまで体験させます。
- 差分と再確認は次のスライドで行います。
-->

---
layout: default
---

<div class="kicker">S4 / Verify</div>

# 差分を読み、同じ4操作で確かめる

<div class="split">
  <div>

```bash
git status --short
git diff -- app/support-ticket-dashboard/app.js
```

<ul class="check-list">
  <li>検索対象の項目が変わっていない</li>
  <li>ステータス<code>all</code>の挙動が変わっていない</li>
  <li>並び替えと<code>calc</code>が変更されていない</li>
  <li>DOM描画が変更されていない</li>
  <li>変更理由を説明できない差分がない</li>
</ul>

<p class="muted">結果が違えば採用せず、差分を戻すか原因を調べます。</p>

  </div>
  <div>
    <img src="/screenshots/s4-refactor-diff-and-tests.png" class="screenshot" alt="抽出後の差分とテスト結果">
    <p class="image-caption"><code>filterByKeyword</code>と<code>filterByStatus</code>へ抽出。<code>npm test</code>は6件成功、続けて同じ4操作を再確認する</p>
  </div>
</div>

<!--
0:52-0:55
- git diffを読み、対象外が変わっていないかを5項目で確認します。
- npm testと、Baselineで使った同じ4操作を再実行します。
- 短くなったかではなく、外から見える動作を維持できたかで判断すると伝えます。
-->

---
layout: default
---

<div class="kicker">S5 / Review</div>

# 60分で実践した役割分担

<div class="human-ai">
  <div class="header">場面</div>
  <div class="header">Copilotに任せたこと</div>
  <div class="header">人が確認したこと</div>

  <div>最初の一歩</div>
  <div>対象ファイルの概要説明</div>
  <div>ファイルと関数が実在するか</div>

  <div>コード理解</div>
  <div>処理の流れを整理</div>
  <div>説明とコードが一致するか</div>

  <div>仕様・文書</div>
  <div>差分候補とメモの下書き</div>
  <div>事実と未確定事項の分離</div>

  <div>リファクタリング</div>
  <div>小さな変更計画と編集</div>
  <div>差分、テスト、画面動作</div>
</div>

<!--
0:55-0:57
- Copilotと人の責任範囲を振り返ります。
- 「生成したから完了」ではなく、「根拠を確認したら完了」です。
-->

---
layout: default
---

<div class="kicker">S5 / Next Action</div>

# 明日試す作業を1つ選ぶ

<div class="grid-4">
  <div class="card accent"><h3>/explain</h3><p>読み慣れていない関数を説明させる。</p></div>
  <div class="card accent"><h3>#file</h3><p>対象ファイルを指定して流れを整理する。</p></div>
  <div class="card accent"><h3>仕様比較</h3><p>差分候補と質問を分ける。</p></div>
  <div class="card accent"><h3>小さな変更</h3><p>変更前の動作を確認してから直す。</p></div>
</div>

<div class="callout">明日試す小さな活用場面を1つ決め、検証方法とセットで持ち帰ります。</div>

<!--
0:57-1:00
- 参加者に4つの例から、明日試す作業を1つ選んでもらいます。
- 対象、目的、制約、検証方法をセットにして業務へ持ち帰るよう案内します。
-->
