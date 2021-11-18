# アプリケーション概要 (Application Overview)
* 株式トレードサポートツールです(現在はデイトレード向けの機能がメインです). (Trade Supporting Tool especially for Day-trader　)
  * 国内株式のみに対応　(Supporting only Japanese stocks )
* https://traweather.xyz
* アプリケーション機能詳細は、上記のURLのトップページに記載しております。(Detailed features of this app are described on the top page of the above URL.)

# 基本機能 (basic functions)
* ログイン機能 (Login)
* 画像アップロード機能 (Image upload)
* サイト内株式検索　(Stock Search)
* 投稿、更新、削除機能　(Create & Update & Delete)
  * 市場予想投稿 (market prediction)
  * トレードプラン作成 (trade plan)
  * トレード結果作成（trade result）
  * トレード振り返り作成 (trade reflection)

# 使用技術  (Technology used)
## FRONTEND
* Javascript
  * React (functional)
* Sass
* Main Library
  * axios
  * chart.js
  * jsonwebtoken
  * react-hook-form
  * react-paginate
## BACKEND
* Node.js (express)
* PostgreSQL
* Main Library
  * express
  * pg
  * node-cron
  * jsonwebtoken
  * multer
  * bcryptjs
  * aws-sdk
  * csvtojson
  * iconv-lite
## Infrastructure
* Proxy Server（NGINX）
* WEB Server（NGINX）
* AWS
  * ECS (Fargate)
  * ECR
  * S3
  * RDS
  * Route 53
  * ACM
* Docker
* Circle Ci
## Domain Registrar
* NameCheap
## テストツール及びバージョン管理　( Test tool & Version control tool)
* PostMan
* Jest
* Git Hub　(git kraken)

# 外部API (External API)
* KABU+ (株価のCSVデータ取得先)
* KABU+ APi to get CSV data of stock price

# 補足 (supplementary material)
* タブレットやワイドディスプレイへのレスポンシブ対応はしていますが、スマホのレスポンシブ対応はしていないです。
* This app is responsive to tablets and wide displays, but not responsive to smartphones.

# Architecture　
![Screen Shot 2021-11-02 at 13 59 31](https://user-images.githubusercontent.com/54715182/139789313-283e3df3-4af1-4aab-b395-297e1bb1704a.png)

# Table Relationship
![Screen Shot 2021-11-18 at 11 34 33](https://user-images.githubusercontent.com/54715182/142341123-255130ce-2523-4aad-b7a1-799f8e745f94.png)
