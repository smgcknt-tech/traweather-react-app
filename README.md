# アプリケーション概要 (Application Overview)
* 株式トレードサポートツールです. (Stock trading support tool.)
* https://traweather.xyz

# 基本機能 (basic functions)
* ログイン機能 (Login)
* 画像アップロード機能 (Image upload)
* アプリケーション機能詳細は、上記のURLのトップページに記載しております。(Detailed features of this app are described on the top page of the above URL.)

# 使用技術  (Technology used)
## FRONTEND
* React(17.0.2),Sass
## BACKEND
* Express (node ver16.13.0)
* PostgreSQL (ver12.8)

##　Infrastructure
* Proxy server（NGINX）
* WEB server（NGINX）
* AWS(ECS Fargate, ECR, S3, RDS)
* Docker
* Circle ci
## テストツール及びバージョン管理　( Test tool & Version control tool)
* PostMan
* Git hub　(git kraken)

# 外部API (External API)
* KABU+(株価のCSVデータ取得先(APi to get CSV data of stock price))

#　補足 (supplementary material)
* タブレットやワイドディスプレイへのレスポンシブ対応はしていますが、スマホのレスポンシブ対応はしていないです。(This app is responsive to tablets and wide displays, but not responsive to smartphones.)　

# Architecture　
![Screen Shot 2021-11-02 at 13 59 31](https://user-images.githubusercontent.com/54715182/139789313-283e3df3-4af1-4aab-b395-297e1bb1704a.png)
