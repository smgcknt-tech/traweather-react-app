import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AppActions, AppContext } from '../AppStore';
import { helper } from '../utils/helper';
import '../../src/styles/pages/ResultPage.scss';
import Loading from '../components/common/Loading';
import Message from '../components/common/Message';
import ResultTable from '../components/ResultTable';
import CommentPerStock from '../components/CommentPerStock';
import ComparisonChart from '../components/ComparisonChart';
import TradeFeedBackForm from '../components/forms/TradeFeedBackForm';

export default function ResultPage() {
  const { state, dispatch } = useContext(AppContext);
  const { user, loading, error, resultData, selectedStock, resultIndicators } = state;
  const { monthly_profit, last_profit, weekly_profit, win_lose } = resultIndicators;
  const [open, setOpen] = useState(false);


  useEffect(() => {
    if (user.id) {
      (async () => {
        const data = await helper.fetchData(`/api/results`, dispatch, AppActions, {
          user_id: user.id,
        });
        if (data) {
          const { monthly_profit, last_profit, weekly_profit, win_lose, resultData } = data;
          dispatch({ type: AppActions.SET_RESULT, payload: resultData });
          dispatch({
            type: AppActions.SET_SELECTED_STOCK,
            payload: resultData[0],
          });
          dispatch({
            type: AppActions.SET_RESULT_INDICATORS,
            payload: {
              ...resultIndicators,
              monthly_profit,
              last_profit,
              weekly_profit,
              win_lose,
            },
          });
        }
      })();
    }
    // Do not set resultIndicators in dependency array
  }, [user, dispatch]); // eslint-disable-line

  const profitResult = useMemo(() => {
    return resultData
      .map((result) => {
        return result.total_profit_loss;
      })
      .reduce((prev, crr) => (prev += crr), 0);
  }, [resultData]);

  if (loading) return <Loading />;
  if (error) return <Message variant="error">{error}</Message>;
  if (resultData?.length === 0) return <Message>プランデータをまず作成して下さい</Message>;
  return (
    <div className="result_page">
      <ul className="header_menu">
        <li
          onClick={() => {
            setOpen('feed_back');
          }}
        >
          <i className="fas fa-edit" />
          反省追加
        </li>
      </ul>
      <div className="main">
        {open === 'feed_back' && <TradeFeedBackForm setOpen={setOpen} />}
        <div className="dashboard">
          <div className="dashboard_row1">
            <div className="indicators">
              <div id="todays_profit">
                <div className="card_value">{profitResult}円</div>
                <div className="card_title">{helper.time().today}</div>
              </div>
              <div id="last_profit">
                <div className="card_value">{last_profit}円</div>
                <div className="card_title">前日損益</div>
              </div>
              <div id="monthly_profit">
                <div className="card_value">{monthly_profit}円</div>
                <div className="card_title">今月損益</div>
              </div>
              <div id="weekly_profit">
                <div className="card_value">{weekly_profit}円</div>
                <div className="card_title">今週損益</div>
              </div>
              <div id="weekly_profit">
                <div className="card_value">
                  {win_lose.monthly_win}W-{win_lose.monthly_lose}L
                </div>
                <div className="card_title">今月勝敗</div>
              </div>
            </div>
            {resultData.length > 0 && <ResultTable />}
          </div>
          <div className="dashboard_row2">
            <div className="left_col">{selectedStock && <ComparisonChart />}</div>
            <div className="right_col">
              <CommentPerStock />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
