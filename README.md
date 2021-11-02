アプリケーション概要:株式トレードサポートツールです.
URL
https://traweather.xyz/　

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
※スキーマの差分管理はrecord.sqlファイルでマニュアル管理　　
外部API
-KABU+(株価のCSVデータを取得するため)

その他
  - タブレットやワイドディスプレイへのレスポンシブ対応はしていますが、スマホのレスポンシブ対応はしていないです。　　

本番環境のアーキテクチャ　　
![Screen Shot 2021-11-02 at 13 59 31](https://user-images.githubusercontent.com/54715182/139789313-283e3df3-4af1-4aab-b395-297e1bb1704a.png)
