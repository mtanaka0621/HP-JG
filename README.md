# JG CORPORATION — Renewed Corporate Website

> CONSULTING &amp; BEYOND. 大手コンサルティングファーム出身者を中心に構成された、コンサルティング × テクノロジー × バイリンガルをコアケイパビリティとする企業 **株式会社JGコーポレーション** の公式コーポレートサイト（リニューアル版）。

オリジナルサイト (`jg-corporation.com`) のコンテンツを完全に踏襲しつつ、ワイヤーフレームを中心としたモダンで威厳のあるデザインに刷新した静的ウェブサイトです。

---

## 🎨 Design Concept

| 項目 | 内容 |
|---|---|
| **テーマ** | コンサルティングファームに相応しい、威厳と信頼感のあるダーク基調デザイン |
| **背景** | サイト全体に**ワイヤーフレーム**SVGを敷き詰め（白線・統一された太さと濃度） |
| **線の方向** | 右上→左下の主線は同一スロープで**不均等に並行**。交差する線はランダム角度 |
| **カラーパレット** | Charcoal `#0a0a0c` / White `#ffffff` / Magenta accent `#e6007e` |
| **タイポグラフィ** | Montserrat (英) / Noto Sans JP (和) / Cormorant Garamond (見出し補助) |
| **ヒーロー** | Canvas パーティクルネットワーク + マウスインタラクション + タイプライターエフェクト |
| **カーソル** | カスタムカーソル（ドット + リング、`mix-blend-mode: difference`、ホバー時拡大） |

---

## ✅ Completed Features

### 0. 🆕 画像アセットの完全ローカル化（2026-05 完了）
- [x] **全画像を `images/` 配下に一元管理**（カテゴリ別に 8 サブフォルダで整理）
- [x] 外部 Genspark CDN URL を全 17 本番 HTML ファイル / `css/style.css` から完全に排除
- [x] ヒーロー動画（5.4MB）もローカル化（`images/video/hero-video.mp4`）
- [x] 公開環境で画像が表示されない問題（CDN の 403/302 対策）を解消
- [x] PlaywrightConsoleCapture により全主要ページで 404 エラーゼロを確認

### 0-2. 🆕 大容量画像の最適化（2026-05-19 完了）
プロジェクト起動時のプレビュー／ファイルエクスプローラー初期化遅延、および公開時の初回ロード負荷を軽減するため、画質を維持したまま大容量画像を再生成・置換しました。

| 対象ファイル | 用途 | Before | After | 削減率 |
|---|---|---:|---:|---:|
| `images/hero/consulting.jpg` | consulting.html バナー背景 | 2,441 KB | 133 KB | -94.6% |
| `images/hero/it.jpg` | it.html バナー背景 | 2,559 KB | 176 KB | -93.1% |
| `images/hero/legal-tax-hr.jpg` | legal-tax-hr.html バナー背景 | 2,635 KB | 189 KB | -92.8% |
| `images/hero/pm.jpg` | pm.html バナー背景 | 2,399 KB | 196 KB | -91.8% |
| `images/hero/solution.jpg` | solution.html バナー背景 | 2,566 KB | 120 KB | -95.3% |
| `images/bg/world-map-outline.jpg` | about.html グローバル展開背景 | 4,874 KB | 119 KB | -97.6% |
| `images/members/member-01.jpg` | about.html 主要メンバー写真 | 1,532 KB | 162 KB | -89.4% |
| `images/members/member-02.jpg` | about.html 主要メンバー写真 | 1,698 KB | 186 KB | -89.0% |
| **合計** |  | **20,704 KB** | **1,281 KB** | **-93.8%** |

- 全ての置換前ファイルは `Backup/20260519_1857/images/` 配下にカテゴリ構造そのままで保存（ロールバック可能）
- 再生成は fal-ai/z-image/turbo（1K解像度、テキスト・透かしなしを明示指定）を使用
- 画像内に意図しない英文テキストが含まれていないことを understand_images で全件確認済み
- 構図・色調・モチーフは元画像のコンセプトを踏襲（コンサル＝会議シーン／IT＝データセンター／法務＝法律書架と天秤 等）

### 1. デザインシステム
- [x] サイト全体ワイヤーフレーム背景 SVG (`images/bg/wireframe-bg.svg`)
- [x] ロゴ SVG（ホワイト版／ダーク版／ファビコン）
- [x] CSS 設計トークン（CSS custom properties）
- [x] レスポンシブグリッド（CSS Grid + Flexbox）
- [x] スクロールに反応するヘッダー（backdrop-blur）
- [x] モバイル用ハンバーガーメニュー
- [x] **グローバルナビにドロップダウンメニュー**
  - **Services** 配下：「Services / 業務改革 / AI 活用 / Retech Vision」
  - **Study Room** 配下：「AI / Technology / IT / PM / コンサルティング / ソリューション / SCM / 管理会計 / 法務・税務・労務」の 9 種類のグロッサリー（各 50〜60 語の用語集）
  - PC はホバー＆クリック、モバイルはタップでインライン展開

### 2. インタラクション
- [x] カスタムカーソル（ドット + リング、ホバー反応）
- [x] ヒーロー Canvas パーティクルネットワーク（マウス追従、マゼンタパルス）
- [x] タイプライター効果（複数フレーズ循環）
- [x] IntersectionObserver によるスクロール時 reveal アニメーション
- [x] ボタンのスライディング背景ホバー効果

### 3. 全ページ実装
| URI | タイトル | 内容 |
|---|---|---|
| `index.html` | CONSULTING &amp; BEYOND | ヒーロー、Aboutティザー、Stats、Mission/Vision、Service グリッド、Feature、News |
| `about.html` | 会社概要 | 会社情報、Mission/Vision、3拠点（東京/博多/セブ）+ Maps、3チーム、News 全件 |
| `feature.html` | 当社の強み | Consulting × Engineering、東京/博多/セブ拠点紹介 |
| `services.html` | サービス | 6サービスグリッド + 詳細6ブロック + お問い合わせフォーム |
| `recruitment.html` | 採用情報 | 3ポジション、Career Model、Evaluation、Welfare 13カード、応募フォーム |
| `think.html` | Study Room → AI Glossary | AI 関連用語集（5 カテゴリ × 50 キーワード） |
| `technology.html` | Study Room → Technology Glossary | 開発技術用語集（5 カテゴリ × 50 キーワード） |
| `it.html` | Study Room → IT Glossary | SI / ウォーターフォール開発工程・成果物・モダン手法 用語集（5 カテゴリ × 50 キーワード／ウォーターフォール 5 工程ストリップ可視化付き） |
| `pm.html` | Study Room → PM Glossary | プロジェクトマネジメント用語集（5 カテゴリ × 50 キーワード ＋「実行可能なプロジェクト計画」トピック：6 原則・アンチパターン比較・16 項目チェックリスト） |
| `consulting.html` | Study Room → Consulting Glossary | コンサルティングの思考法・フレームワーク 用語集（5 カテゴリ × 50 キーワード／MECE・3C・5Forces・SWOT・7S・BSC・ピラミッド・SCQA 等） |
| `solution.html` | Study Room → Solution Glossary | 業務システム・データ基盤・主要製品の用語集（5 カテゴリ × 50 キーワード／SAP・Salesforce・Snowflake・Databricks・Tableau 等の代表ベンダー製品を含む） |
| `scm.html` | Study Room → SCM Glossary | SCM 関連用語集（6 カテゴリ × 60 キーワード／GTIN・GS1 等の識別＆標準を含む ＋「生産計画の立て方」トピック：3 階層計画／入力・進め方・出力／落とし穴 6／10 原則） |
| `management-accounting.html` | Study Room → 管理会計 Glossary | 管理会計用語集（5 カテゴリ × 50 キーワード） |
| `legal-tax-hr.html` | Study Room → 法務・税務・労務 Glossary | 法務・税務・労務 関連用語集（5 カテゴリ × 50 キーワード／契約・コンプライアンス・税制・社会保険・労働法令・人事制度） |
| `contribution.html` | ささやかな取り組み | プラン・インターナショナル / カタリバ |
| `privacypolicy.html` | 個人情報保護方針 | プライバシーポリシー + 個人情報取扱 + 情報セキュリティ方針 |
| `retechvision.html` | RETECH VISION | 不動産業向け業績管理高度化ソリューションの製品ページ |

### 4. コンテンツの正確性
- [x] **会社情報（社名・住所3拠点・設立年度・資本金・スタッフ数等）を二重チェック**
- [x] News 全 13 件、日付・本文を verbatim で掲載
- [x] 取引銀行、子会社情報、在籍者保有資格の verbatim 掲載
- [x] 採用 3 職種すべての業務内容／勤務地／要件／待遇を verbatim 掲載
- [x] サービス 6 種すべての「サービス例 / キーワード」verbatim
- [x] プライバシーポリシーの制定日・改定日・代表取締役氏名・管理者氏名を verbatim

---

## 🌐 URI Map (Public Routes)

すべて静的 HTML ファイル（ハッシュフラグメントを除く）。

```
/                        → index.html（トップページ）
/about.html              → 会社概要
   #mission               → 当社の実現したいこと（Our Mission）
   #profile               → 企業プロフィール
   #offices               → オフィス情報
   #teams                 → チーム紹介
   #news                  → 新着情報一覧
/feature.html            → 当社の強み
   #cebu-info             → フィリピンセブ島について（IT都市紹介・3カード）
/services.html           → サービス
   #bpc                   → Business Process Consulting
   #it-consulting         → IT Consulting
   #tech-consulting       → Technology Consulting
   #analytics             → Data Analytics
   #system-integration    → System Integration
   #joint-development     → Joint Development
   #biz-reform            → 業務改革サービスメニュー（製造業向け 10カード）
   #ai-services           → AI活用サービスメニュー（AI活用 7カード）
   #inquire               → お問い合わせフォーム
/recruitment.html        → 採用情報
   #structure             → 当社の事業全体像
   #growth-vision         → 成長ビジョン（実績／次の目標／中期ビジョン）
   #opportunities         → 成長と活躍の機会
   #career-step           → キャリアステップ
   #career-model          → キャリアモデル（9つのナレッジエリア／キャリアモデル例／8つのキャリアモデル詳細カード：イラスト＋活躍内容説明）
   #compensation          → 待遇1：報酬体系等
   #benefits              → 待遇2：福利厚生他
   #vision-values         → OUR VISION（当社の目指す姿）／ OUR VALUES（当社の価値観）
   #positions             → 募集要項（Consultant / Engineer / Rookie）
   #apply                 → 応募フォーム
/think.html              → Study Room → AI Glossary（AI 関連用語集・50 キーワード）
   #glossary-intro        → 導入・カテゴリ目次
   #cat-foundation        → 01 AI の基礎（10 用語）
   #cat-model             → 02 モデルと技術（10 用語）
   #cat-genai             → 03 生成 AI とプロンプト（10 用語）
   #cat-agent             → 04 AI エージェントと活用領域（10 用語）
   #cat-ops               → 05 運用とガバナンス（10 用語）
   #glossary-outro        → AI 活用相談 CTA
/technology.html         → Study Room → Technology Glossary（開発技術用語集、50 キーワード）
   #glossary-intro        → 導入・カテゴリ目次
   #cat-language          → 01 プログラミング言語（10 用語）
   #cat-framework         → 02 フレームワークとランタイム（10 用語）
   #cat-cloud             → 03 クラウドとインフラ（10 用語）
   #cat-devops            → 04 DevOps とデータ基盤（10 用語）
   #cat-frontier          → 05 最新テクノロジートレンド（10 用語）
   #glossary-outro        → 技術選定・モダナイゼーション相談 CTA
/it.html                 → Study Room → IT Glossary（SI 工程・成果物・モダン開発手法 用語集、50 キーワード）
   #glossary-intro        → 導入・カテゴリ目次（ウォーターフォール 5 工程ストリップ含む）
   #cat-req               → 01 要件定義 — Requirements（10 用語）
   #cat-design            → 02 設計 — Design（10 用語）
   #cat-devtest           → 03 開発・テスト — Development & Test（10 用語）
   #cat-rel               → 04 リリース・運用 — Release & Operations（10 用語）
   #cat-modern            → 05 モダン開発手法 — Modern Approaches（10 用語）
   #glossary-outro        → SI プロジェクト／モダナイゼーション相談 CTA
/pm.html                 → Study Room → PM Glossary（プロジェクトマネジメント用語集・50 キーワード＋実行可能な計画トピック）
   #glossary-intro        → 導入・カテゴリ目次
   #cat-foundation        → 01 PM の基礎（10 用語）
   #cat-plan              → 02 計画立案（10 用語）
   #cat-exec              → 03 実行と統制（10 用語）
   #cat-method            → 04 手法と進め方（10 用語）
   #cat-people            → 05 人と品質（10 用語）
   #topic-execplan        → Topic: 実行可能なプロジェクト計画（6 原則・アンチパターン比較・16 項目チェックリスト）
   #glossary-outro        → 計画レビュー・PMO 立ち上げ相談 CTA
/consulting.html         → Study Room → Consulting Glossary（コンサルティング思考法・フレームワーク 用語集、50 キーワード）
   #glossary-intro        → 導入・カテゴリ目次（思考の骨格 5 ステージ可視化付き）
   #cat-thinking          → 01 思考の基本姿勢 — Thinking Basics（10 用語）
   #cat-problem           → 02 問題解決の進め方 — Problem Solving（10 用語）
   #cat-strategy          → 03 戦略フレームワーク — Strategy Frameworks（10 用語）
   #cat-orgops            → 04 組織・オペレーション — Org & Operations（10 用語）
   #cat-output            → 05 アウトプット技法 — Output Skills（10 用語）
   #glossary-outro        → 戦略・組織・業務改革 相談 CTA
/solution.html           → Study Room → Solution Glossary（業務システム・データ基盤・主要製品 用語集・50 キーワード）
   #glossary-intro        → 導入・カテゴリ目次
   #cat-bizapps           → 01 業務系ソリューション（ERP / CRM / SFA / MA / HCM / SCM システム / 会計 / WF / BPM / EAI・iPaaS）
   #cat-bizproducts       → 02 メジャー製品: Business（SAP S/4HANA / NetSuite / Dynamics 365 / Salesforce / HubSpot / Workday / kintone / freee・MF / SuccessFactors / ServiceNow）
   #cat-data              → 03 データ基盤（DWH / データレイク / レイクハウス / ETL / ELT / パイプライン / マート / MDM / カタログ / メッシュ）
   #cat-dataproducts      → 04 メジャー製品: Data &amp; Cloud（Snowflake / Databricks / BigQuery / Redshift / Fabric / Tableau / Power BI / dbt / Fivetran / Looker）
   #cat-adjacent          → 05 AI &amp; Adjacent（BI / セルフBI / MLOps / Vector DB / RAG / Iceberg-Delta-Hudi / オブザーバビリティ / IDaaS / RPA / ローコード）
   #glossary-outro        → ソリューション選定・導入相談 CTA
/scm.html                → Study Room → SCM Glossary（SCM 関連用語集・60 キーワード）
    ├ #cat-foundation       → 01 Foundations — SCM の基礎
    ├ #cat-plan             → 02 Planning — 計画と最適化
    ├ #cat-exec             → 03 Execution — 調達・生産・物流の実行
    ├ #cat-digital          → 04 Digital & Tech — デジタル SCM
    ├ #cat-risk             → 05 Risk & Sustainability — リスクとサステナビリティ
    └ #cat-id               → 06 Identification & Standards — 識別とコード標準（GTIN / GS1）
   #glossary-intro        → 導入・カテゴリ目次
   #cat-foundation        → 01 SCM の基礎（10 用語）
   #cat-plan              → 02 計画と最適化（10 用語）
   #cat-exec              → 03 調達・生産・物流の実行（10 用語）
   #cat-digital           → 04 デジタル SCM とテクノロジー（10 用語）
   #cat-risk              → 05 リスクとサステナビリティ（10 用語）
   #cat-id                → 06 識別とコード標準（GTIN / GS1 等、10 用語）
   #topic-production-plan → Topic: 生産計画の立て方（3 階層計画／入力・進め方・出力／落とし穴 6／10 原則）
   #glossary-outro        → 業務改革相談 CTA
/management-accounting.html → Study Room → 管理会計 Glossary（50 キーワード）
   #glossary-intro        → 導入・カテゴリ目次
   #cat-foundation        → 01 管理会計の基礎（10 用語）
   #cat-costing           → 02 原価計算（10 用語）
   #cat-budget            → 03 予算管理と計画（10 用語）
   #cat-performance       → 04 業績評価と KPI（10 用語）
   #cat-decision          → 05 意思決定会計（10 用語）
   #glossary-outro        → 業績管理高度化相談 CTA
/legal-tax-hr.html       → Study Room → 法務・税務・労務 Glossary（50 キーワード）
   #glossary-intro        → 導入・カテゴリ目次
   #cat-legal-base        → 01 法務全般（契約 / NDA / 業務委託 / 知財 / 個情法 / 利用規約 / 取締役会・株主総会 / CG / コンプラ / 法務 DD）
   #cat-commercial        → 02 商取引・契約実務（売買契約 / ライセンス / SaaS 契約 / 下請法 / 独禁法 / PL 法 / 景表法 / 消費者契約法 / 電子契約 / 反社チェック）
   #cat-tax               → 03 税務（法人税 / 消費税・インボイス / 源泉税 / 移転価格 / CFC / グループ通算 / 減価償却 / 繰越欠損金 / 税効果会計 / 電帳法）
   #cat-labor             → 04 労務全般（労基法 / 36 協定 / 就業規則 / 同一労働同一賃金 / フレックス・裁量 / テレワーク・副業 / 育介休 / ハラスメント / 安全衛生 / 労使協定）
   #cat-social            → 05 社会保険・人事制度（健保 / 厚年 / 雇保 / 労災 / 年末調整 / マイナンバー / 退職金・DC / 給与計算 / 評価制度 / 賃金台帳）
   #glossary-outro        → 制度設計・運用改善相談 CTA
/contribution.html       → ささやかな取り組み
/retechvision.html       → RETECH VISION 製品ページ
   #service-target / #challenges / #market-analysis /
   #process / #kpi / #prices / #architecture /
   #contract-process / #other-analysis / #capabilities
/privacypolicy.html      → 個人情報保護方針
   #datapolicy            → 個人情報保護方針
   #securitypolicy        → 情報セキュリティに関する方針
```

---

## 📁 Project Structure

```
.
├── index.html                     # トップページ
├── about.html                     # 会社概要
├── feature.html                   # 当社の強み
├── services.html                  # サービス紹介
├── recruitment.html               # 採用情報
├── think.html                     # Study Room: AI Glossary（50 語）
├── technology.html                # Study Room: Technology Glossary（50 語）
├── it.html                        # Study Room: IT Glossary（50 語 / SI 工程・成果物・モダン手法）
├── pm.html                        # Study Room: PM Glossary（50 語 + 実行可能な計画トピック）
├── consulting.html                # Study Room: Consulting Glossary（50 語 / 思考法・フレームワーク）
├── solution.html                  # Study Room: Solution Glossary（50 語 / SAP・Salesforce・Snowflake 等の代表製品を含む）
├── scm.html                       # Study Room: SCM Glossary（60 語 + 生産計画の立て方トピック）
├── management-accounting.html     # Study Room: 管理会計 Glossary（50 語）
├── legal-tax-hr.html              # Study Room: 法務・税務・労務 Glossary（50 語）
├── contribution.html              # ささやかな取り組み
├── privacypolicy.html             # 個人情報保護方針 / 情報セキュリティ方針
├── retechvision.html              # RETECH VISION 製品ページ
├── README.md                      # このファイル
├── css/
│   └── style.css                  # サイト全体のデザインシステム
├── js/
│   └── main.js                    # 全インタラクション
└── images/                        # 画像アセット（すべてローカルに一元管理）
    ├── logo/                      # ロゴ・ファビコン類
    │   ├── favicon.svg
    │   ├── logo-jg-dark.svg
    │   ├── logo-jg-white.svg
    │   ├── jg-corporation-banner.png     # 全ページ共通のヘッダー/フッターロゴ
    │   ├── jg-corporation-small.png      # recruitment.html グループ会社図用
    │   ├── bluewind-asia.png             # BLUEWIND ASIA ロゴ
    │   └── cartridge.png                 # CARTRIDGE Singapore / Japan ロゴ
    ├── bg/                        # CSS背景・装飾画像
    │   ├── wireframe-bg.svg              # サイト全体背景
    │   ├── singapore-skyline.jpg         # index/about のフルワイド背景
    │   ├── world-map-outline.jpg         # about の世界地図
    │   ├── corevalues-hero.jpg           # corevalues ヒーロー背景
    │   └── retechvision-bg.jpg           # retechvision セクション背景
    ├── hero/                      # 各ページの page-banner-bg 用ヒーロー画像
    │   ├── about.jpg, consulting.jpg, contribution.jpg, feature.jpg,
    │   │   it.jpg, legal-tax-hr.jpg, management-accounting.jpg, pm.jpg,
    │   │   recruitment.jpg, retechvision.jpg, scm.jpg, services.jpg,
    │   │   solution.jpg, technology.jpg, think.jpg
    ├── office/                    # 拠点紹介ギャラリー写真（about.html）
    │   ├── yaesu-01-entrance.jpg ～ yaesu-06-team-photo.jpg（八重洲）
    │   ├── yaesu-poster.jpg              # （未使用・保管）旧 index.html ヒーロー動画ポスター。現在は video の自動先頭フレーム表示に切替
    │   ├── marunouchi-01..03-*.jpg       # 丸の内
    │   ├── hakata-01..03-*.jpg           # 博多
    │   ├── cebu-01..06-*.jpg             # セブ
    │   ├── cebu-region-map.jpg, cebu-city-scene.jpg
    ├── members/                   # メンバープロフィール写真（about.html）
    │   └── member-01.jpg ～ member-10.jpg
    ├── feature/                   # feature.html 強み紹介イラスト
    │   ├── operations.jpg, manufacturing.jpg, ai-tech.jpg, collaboration.jpg
    ├── recruitment/               # recruitment.html 専用画像
    │   ├── vision-values-bg.jpg, enjoy-banner.jpg, global-map.jpg
    │   ├── org-stage-1..3.jpg            # 組織成長段階の図
    │   └── role-01..08-*.jpg             # 8職種カード
    └── video/
        └── hero-video.mp4                # index.html ヒーロー動画
```

---

## 🧠 Data Model & Storage

本サイトは **完全に静的なフロントエンドサイト** です。バックエンド／データベース／API への依存はありません。

| 種別 | 実装 |
|---|---|
| ページコンテンツ | HTML に直接埋め込み（verbatim 掲載済み） |
| 写真素材 | **すべて `images/` 配下にローカル保存**（`logo/`, `hero/`, `office/`, `members/`, `feature/`, `recruitment/`, `bg/`, `video/` にカテゴリ別整理） |
| アイコン | SVG をローカル `images/logo/` に保持 |
| ロゴ | SVG（テキスト + 矩形 + マゼンタ円 = "i" のドット） |
| フォーム送信 | UI のみ実装（送信先未指定 ＝ デモ表示）。`<form>` には `action` 未設定 |

> 採用フォーム・問い合わせフォームは UI のみで、サーバー送信処理は未実装です。バックエンド（Google Forms / Formspree 等）と連携する場合は別途設定が必要です。

---

## 🚀 Deployment

本プロジェクトをライブで公開するには、**Publish タブ** からワンクリックで公開できます。Publish タブが自動的にすべてのデプロイ処理を実行し、ライブ URL を発行します。

---

## ⚠️ Known Limitations / Not Yet Implemented

- [ ] フォーム送信機能（バックエンド未連携。UI のみ）
- [ ] 言語切替（JP / EN リンクはあるが英語版ページは未作成）
- [ ] Think 記事の個別詳細ページ（カード一覧のみ。詳細ページは未実装）
- [ ] お知らせの動的読み込み（現在は HTML 直書き）
- [ ] サイト内検索
- [ ] OG 画像 / Twitter Card メタの最適化

---

## 🛠️ Recommended Next Steps

1. **フォーム連携** — Formspree / Google Forms / 自社メール API への送信処理を `js/main.js` に追加
2. **英語版** — `/en/` 配下に各ページの英語版を作成。`nav-lang` のリンクを実装
3. **Think 詳細ページ** — `think/think_YYYYMMDD.html` を 8 記事ぶん作成
4. **News 管理** — 静的JSON もしくは Headless CMS (microCMS等) から動的に取得
5. **OGP** — 各ページに `og:image`, `twitter:card` を設定
6. **アクセシビリティ監査** — Lighthouse / axe で WCAG 適合度を確認
7. **画像最適化** — 現在の JPEG/PNG を WebP / AVIF に変換し、`<picture>` で多形式配信
8. **解析タグ** — Google Tag Manager / GA4 / その他アナリティクスの導入

---

## 📜 License / Credits

- **コンテンツ** © 株式会社JGコーポレーション
- **デザイン &amp; 実装** — Renewed by AI Developer Lite
- **フォント** — Google Fonts（Montserrat / Noto Sans JP / Cormorant Garamond）
- **アイコン** — オリジナル SVG

---

© 2026 JG Corporation. All rights reserved.
