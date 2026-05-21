# JG CORPORATION コーポレートサイト

## プロジェクト概要

**JG CORPORATION** のコーポレートホームページです。コンサルティングとテクノロジー、バイリンガルをコアケイパビリティとする企業の公式サイトで、企業情報・サービス・採用情報・Study Room（業界用語集）などを包括的に提供します。

- **GitHub ソース**: https://github.com/mtanaka0621/HP-JG

---

## 実装済み機能

### ページ一覧

| ページ | パス | 説明 |
|--------|------|------|
| ホーム | `index.html` | ヒーロー動画・タイプライターアニメーション・About/Mission/Vision/Feature/Newsセクション |
| About | `about.html` | 会社概要・メンバー紹介・拠点情報 |
| Feature | `feature.html` | JGの強み（コンサルティング・テクノロジー） |
| Services | `services.html` | サービス一覧 |
| Retech Vision | `retechvision.html` | 不動産業向けSaaS紹介 |
| Recruitment | `recruitment.html` | 採用情報・職種・エントリー |
| Contribution | `contribution.html` | 社会貢献活動 |
| Core Values | `corevalues.html` | 企業理念・バリュー |
| Privacy Policy | `privacypolicy.html` | 個人情報保護方針・情報セキュリティ方針 |

### Study Room（業界用語集）

| ページ | パス | 説明 |
|--------|------|------|
| AI Glossary | `think.html` | AI関連用語集 |
| Technology Glossary | `technology.html` | テクノロジー用語集 |
| IT/SI Glossary | `it.html` | IT・SI用語集 |
| PM Glossary | `pm.html` | プロジェクトマネジメント用語集 |
| Consulting Glossary | `consulting.html` | コンサルティング用語集 |
| Solution Glossary | `solution.html` | ソリューション用語集 |
| SCM Glossary | `scm.html` | サプライチェーンマネジメント用語集 |
| 管理会計 | `management-accounting.html` | 管理会計用語集 |
| 法務・税務・労務 | `legal-tax-hr.html` | 法務・税務・労務用語集 |

### 主要機能

- **ヒーロー動画**: MP4バックグラウンド動画（フォールバック画像付き）
- **タイプライタアニメーション**: Typewriter.js を使用した文字アニメーション
- **レスポンシブナビゲーション**: ハンバーガーメニュー・ドロップダウン対応
- **スクロールアニメーション**: Intersection Observer APIによるrevealアニメーション
- **ニュース展開**: "View All News"ボタンで追加ニュースを表示
- **フォトバナー**: Mission・Visionセクションの背景写真付きバナー
- **統計カウンター**: 企業KPI（170名・5拠点・2017年設立・資本金1億円）
- **フッターサイトマップ**: 全ページへのリンク構造

---

## ファイル構造

```
/
├── index.html                    # ホームページ
├── about.html                    # 会社概要
├── feature.html                  # 特徴・強み
├── services.html                 # サービス一覧
├── retechvision.html             # Retech Vision (不動産SaaS)
├── recruitment.html              # 採用情報
├── contribution.html             # 社会貢献
├── corevalues.html               # コアバリュー
├── privacypolicy.html            # プライバシーポリシー
├── think.html                    # AI用語集
├── technology.html               # テクノロジー用語集
├── it.html                       # IT/SI用語集
├── pm.html                       # PM用語集
├── consulting.html               # コンサルティング用語集
├── solution.html                 # ソリューション用語集
├── scm.html                      # SCM用語集
├── management-accounting.html    # 管理会計用語集
├── legal-tax-hr.html             # 法務・税務・労務用語集
├── css/
│   └── style.css                 # メインスタイルシート
├── js/
│   └── main.js                   # メインJavaScript
└── images/
    ├── logo/                     # ロゴ画像
    ├── hero/                     # ページヒーロー画像
    ├── bg/                       # 背景画像
    ├── feature/                  # Feature ページ画像
    ├── members/                  # メンバー写真 (10名)
    ├── office/                   # オフィス写真 (各拠点)
    ├── recruitment/              # 採用ページ画像
    └── video/
        └── hero-video.mp4        # トップページヒーロー動画
```

---

## 使用技術・ライブラリ

| 技術 | 用途 |
|------|------|
| HTML5 / CSS3 | 静的サイト構築 |
| Vanilla JavaScript | インタラクティビティ |
| [Typewriter.js v2.21.0](https://github.com/tameemsafi/typewriterjs) | タイプライタアニメーション |
| Google Fonts (Montserrat / Noto Sans JP / Cormorant Garamond) | フォント |
| Intersection Observer API | スクロールアニメーション |

---

## 会社情報

- **会社名**: 株式会社JGコーポレーション (JG CORPORATION)
- **設立**: 2017年7月
- **資本金**: 1億円
- **従業員数**: 約170名
- **拠点**: 東京（丸の内・八重洲）・博多・セブ（フィリピン）・シンガポール
- **主要事業**: コンサルティング・システム開発・SaaS（Retech Vision）

---

## デプロイ

サイトを公開するには **Publish タブ** をご利用ください。Publish タブから1クリックでデプロイでき、ライブURLが発行されます。
