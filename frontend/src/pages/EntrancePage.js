import { Link } from 'react-router-dom';
import user1 from '../images/user1.jpg';
import marketPage from '../images/marketPage.png'
import planPage from '../images/planPage.png';
import resultPage from '../images/resultPage.png';
import reflection from '../images/reflection.png';
import screening from '../images/screening.png';
import '../styles/pages/EntrancePage.scss';
export default function LoginPage() {
  return (
    <div className="entrance">
      <div className="main_container">
        <div className="message">
          <h2>TRAWEATHER</h2>
          <p>-Investment And Trade Supporting Tool For You-</p>
          <div className="button_container">
            <Link to="/market">
              <div className="button">利用開始</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="explanation_container">
        <div className="feature_list_container">
          <h2>Main Features</h2>
          <p>機能概要</p>
          <div className="feature_cards">
            <div className="card">
              <i className="fas fa-cloud-sun"></i>
              <p>市場分析</p>
              <p>Market Analysis</p>
            </div>
            <div className="card">
              <i className="fas fa-chess-pawn"></i>
              <p>トレード計画</p>
              <p>Trade Planning</p>
            </div>
            <div className="card">
              <i className="fas fa-chart-bar"></i>
              <p>結果分析</p>
              <p>Result Analysis</p>
            </div>
            <div className="card">
              <i className="fas fa-book"></i>
              <p>振り返り</p>
              <p>Review</p>
            </div>
            <div className="card">
              <i className="fas fa-search-plus"></i>
              <p>銘柄選定</p>
              <p>Stock screening</p>
            </div>
          </div>
        </div>
      </div>
      <div className="feature_pickup_container">
        <div className="title">
          <h2>Pick Up</h2>
          <p>機能詳細</p>
        </div>
        <div className="pickup_body">
          <div className="text">
            <h2>Market tone analysis</h2>
            <p>
              市場の調子を予測するために必要な経済指標を効率よく確認できます。また予想内容を記入して保存することで後で振り返る際に確認できます。
            </p>
            <p>
              this feature helps you check the economic indicators needed to predict market conditions Efficiently . You
              can also fill in the forecast and save it so that you can check it later when you look back.
            </p>
          </div>
          <img src={marketPage} alt="market" />
        </div>
        <div className="pickup_body">
          <img src={planPage} alt="plan" />
          <div className="text">
            <h2>Trade Plan Making</h2>
            <p>
              銘柄ごとにトレードプランを作成可能。あらかじめ、プランを立てておくことで振り返りに役立つだけでなく、当日落ち着いたトレードができます。
            </p>
            <p>
              You can create a trade plan for each stock. Making a plan in advance not only helps you to look back on
              result, but also allows you to trade calmly.
            </p>
          </div>
        </div>
        <div className="pickup_body">
          <div className="text">
            <h2>Trade Result Analysis</h2>
            <p>
              事前に作成したプランデータにトレード記録を記入。予想通りにトレードができたかを把握して、これまでのトレードで得た損益等の指標も確認できます。
            </p>
            <p>
              By entering the trade record in the plan data created in advance of the result, you can check whether the
              trade was successful as expected and check the profit and loss indicators obtained from the previous
              trades.
            </p>
          </div>
          <img src={resultPage} alt="result" />
        </div>
        <div className="pickup_body">
          <img src={reflection} alt="reflection" />
          <div className="text">
            <h2>Review</h2>
            <p>
              当日のトレードに対する感想や気づきを投稿できます。日記のように後で振り返ることで、今後のトレードの改善に役立ちます。
            </p>
            <p>
              You can post your impressions and findings about the trade on the day. Looking back later like a diary
              will help improve future trades.
            </p>
          </div>
        </div>
        <div className="pickup_body">
          <div className="text">
            <h2>Trade result review</h2>
            <p>
              トレード銘柄の選定の際に役立つ検索機能。証券番号や銘柄名から検索が可能。また独自のテーマで集めた銘柄リストを紹介するPICKUP機能もご利用いただけます。
            </p>
            <p>
              A search function that is useful when selecting trade stocks. You can search by stock code or stock name.
              You can also use the PICK UP list, which introduces a list of stocks collected under specific theme.
            </p>
          </div>
          <img src={screening} alt="screening" />
        </div>
      </div>
      <div className="user_review_container">
        <div className="review">
          <h2>What Users Are Saying</h2>
          <p>"this app helps me prepare for trade plan a lot !"</p>
          <p>このアプリのおかげでトレードの準備がめちゃくちゃ楽になりました!</p>
          <div className="user_profile">
            <img src={user1} alt="user_image" />
            <p>smgcknt, JAPAN</p>
          </div>
        </div>
      </div>
    </div>
  );
}
