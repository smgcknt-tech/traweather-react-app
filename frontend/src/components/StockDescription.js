import React, { useContext, useEffect, memo } from 'react';
import { useHistory } from 'react-router';
import { AppActions, AppContext } from '../AppStore';
import { helper } from '../utils/helper';
import Loading from './common/Loading';
import Message from './common/Message';
import Indicators from './Indicators';
import TradeHistory from './TradeHistory';
import '../styles/components/StockDescription.scss';


export default memo(function StockDescription(props) {
  const { state, dispatch } = useContext(AppContext);
  const { loading, error, allStocks, indicators, tradeHistory, user } = state;
  const { code } = props;
  let history = useHistory();

  useEffect(() => {
    if (user.id)
      (async () => {
        const indicatorsData = allStocks?.find((stock) => code === stock.code);
        if (indicatorsData) dispatch({ type: AppActions.SET_INDICATORS, payload: indicatorsData });
        const fetchedHistory = await helper.fetchData(`/api/trade_history`, dispatch, AppActions, {
          code: code,
          user_id: user.id,
        });
        if (fetchedHistory.length > 0) dispatch({ type: AppActions.SET_TRADE_HISTRY, payload: fetchedHistory });
      })();
  }, [user, code, allStocks, dispatch]);

  const handleClose = () => {
    history.push('/screening');
  };

  if (loading) return <Loading />;
  if (error) return <Message variant="error">{error}</Message>;
  return (
    <div className="stock_description">
      <div className="close_btn" onClick={handleClose}>
        <i className="fas fa-undo-alt" />
        <span>BACK</span>
      </div>
      {indicators && <Indicators result={indicators} />}
      {tradeHistory && <TradeHistory />}
    </div>
  );
});
