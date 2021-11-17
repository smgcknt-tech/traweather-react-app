import React, { useContext, useEffect, useMemo } from 'react';
import { AppActions, AppContext } from '../AppStore';
import { helper } from '../utils/helper';
import '../../src/styles/pages/ResultPage.scss';
import Loading from '../components/common/Loading';
import Message from '../components/common/Message';
import ResultTable from '../components/ResultTable';
import CommentPerStock from '../components/CommentPerStock';
import ComparisonChart from '../components/ComparisonChart';

export default function ResultPage() {
  const { state, dispatch } = useContext(AppContext);
  const { user, loading, error, resultData, resultIndicators, allStocks } = state;
  const { monthly_profit, last_profit, weekly_profit, win_lose} = resultIndicators;

  useEffect(() => {
    if (user.id && allStocks) {
      (async () => {
        const data = await helper.fetchData(`/api/results`, dispatch, AppActions, {
          user_id: user.id,
        });
        if (data) {
          const { monthly_profit, last_profit, weekly_profit, win_lose, resultData } = data;
          console.log(win_lose)
          dispatch({ type: AppActions.SET_RESULT, payload: resultData });
          dispatch({
            type: AppActions.SET_SELECTED_STOCK,
            payload: resultData[0],
          });
          const initialStockData = resultData.length
            ? await allStocks?.find((stock) => resultData[0].code === Number(stock.code))
            : null;
          dispatch({
            type: AppActions.SET_RESULT_INDICATORS,
            payload: {
              ...resultIndicators,
              stockData: initialStockData,
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
  }, [user, dispatch, allStocks]); // eslint-disable-line

  const profitResult = useMemo(() => {
    return resultData
      .map((result) => {
        return result.total_profit_loss;
      })
      .reduce((prev, crr) => (prev += crr), 0);
  }, [resultData]);

  if (loading) return <Loading />;
  if (error) return <Message variant="error">{error}</Message>;
  if (!resultData.length) return <Message>まずはトレードプランを作成しましょう</Message>;
    return (
      <div className="result_page">
        <div className="main">
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
              <ResultTable />
            </div>
            <div className="dashboard_row2">
              <div className="left_col">
                <ComparisonChart />
              </div>
              <div className="right_col">
                <CommentPerStock />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
