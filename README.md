# アプリケーション概要 (Application Overview)
* 株式トレードサポートツールです。現在はデイトレード向けの機能が主。(Trade Supporting Tool especially for Day-trader　)
  * 国内株式のみに対応　(Supporting only Japanese stocks)
* https://traweather.xyz
* アプリケーション機能詳細は、上記のURLのトップページにも記載しております。(Detailed features of this app are described on the top page of the above URL.)
## 利用ガイド　（Usage guide）
https://user-images.githubusercontent.com/54715182/142711920-39d989e9-3ca1-4d1b-b69e-1a3d7cf149ae.mov

1. 新規の方は新規登録、登録済みの方はログインしてください。　（If you are new user, Please sign up first.）
1. 経済指数を把握して今日一日の市場予想を考えて投稿しましょう。　(Grasp the economic index and think about the market forecast for today and post it.)
1. 今日トレードする銘柄を決めたら、トレードプランを作成しましょう (Once you have decided which stocks to trade today, let's create a trading plan)
1. トレードが終了したら、結果を記入しましょう。この時自分のプランに通りにトレードできたかを確認しましょう。 (When the trade is over, let's fill in the result. At this time, confirm whether you could trade according to your plan or not.)
1. 今日一日のトレードを振り返り、反省文を考えて投稿しましょう。 (Let's look back on the trades of the day today, think about the reflections, and post.)

* トレード後 (After trade)
  * スクリーニング画面で銘柄の情報や、過去のトレード結果を確認し、次回のトレードの準備に役立てましょう。（Check the stock information and past trade results on the screening screen and use it to prepare for the next trade.）
  * 過去の振り返り投稿を使って、今後のトレード改善に役立てましょう。　（Check the stock information and past trade results on the screening screen and use it to prepare for the next trade.）


# 基本機能 (Basic Functions)
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
  * Framework
    * React Functional Component
* Sass
* Library
  * ./frontend/package.json を確認下さい。
## BACKEND
* Node.js
  * Framework
    * Express
* PostgreSQL
* Library
  * ./backtend/package.json を確認下さい。
## Infrastructure
* Proxy Server（NGINX）
* WEB Server（NGINX）
* AWS
  * ECS (Fargate)
  * ECR
  * NLB
  * S3
  * RDS
  * Route 53
  * ACM
  * Lambda
* Docker
* Circle Ci

## Domain Registrar
* NameCheap

## テストツール及びバージョン管理　( Test & Version control tool)
* PostMan
* Jest
* Git Hub　(git kraken)

# 外部API (External API)
* KABU+ 株価のCSVデータ取得先 (APi to get CSV data of stock price)

# 補足 (supplementary material)
* タブレットやワイドディスプレイへのレスポンシブ対応はしていますが、スマホのレスポンシブ対応はしていないです。(responsive to tablets and wide displays, but not responsive to smartphones.)

# Architecture　
![Screen Shot 2021-12-07 at 4 06 06](https://user-images.githubusercontent.com/54715182/144906813-cdaf0d35-44db-4f50-b742-44b59e3f82aa.png)

# More about project (プロジェクトの追加情報)
* [Elaboration of this project](https://github.com/smgcknt-tech/traweather-react-app/wiki/Summary-of--this-project)

