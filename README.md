アプリケーション概要:株式トレードサポートツールです.
URL
http://ec2-35-76-244-232.ap-northeast-1.compute.amazonaws.com

機能
ーログイン機能
ー画像アップロード機能
ー市場予想入力機能
ー当日の株式データ取得機能
ー当日のトレードプラン作成機能
ー当日のトレード結果作成機能
ー過去のトレード結果振り返り機能

使用技術
フロントエンド
→React,Sass
バックエンド
-Node.js(express)
-PostgreSQL
インフラ
Proxyサーバー（NGINX）
-WEBサーバー（NGINX）
-AWS(ECS Fargate, ECR, S3, RDS)
-Docker
-circle ci
テストツール及びバージョン管理
-Jest
-PostMan
-Git hub
外部API
-KABU+(株価のCSVデータを取得するため)

全体イメージ
![Screen Shot 2021-10-21 at 15 07 29](https://user-images.githubusercontent.com/54715182/138222897-c1889397-c3ee-4372-8a66-31e457ea2370.png)
