import React, { useContext, useEffect } from 'react';
import { AppActions, AppContext } from '../../AppStore';
import { useHistory } from 'react-router';
import { helper } from '../../utils/helper';
import Indicators from '../../components/Indicators';
import TradeHistory from './TradeHistory';
import '../../styles/components/StockDescription.scss';

export default function StockDescription(props) {
  const { state, dispatch } = useContext(AppContext);
  const { allStocks, indicators, tradeHistory } = state;
  const { code } = props;
  let history = useHistory();

  useEffect(() => {
    (async () => {
      const indicatorsData = allStocks?.find((stock) => code === stock.code);
      if (indicatorsData) dispatch({ type: AppActions.SET_INDICATORS, payload: indicatorsData });
      const fetchedHistory = await helper.fetchData(`/api/trade_history`, dispatch, AppActions, { code: code });
      if (fetchedHistory.length > 0) dispatch({ type: AppActions.SET_TRADE_HISTRY, payload: fetchedHistory });
    })();
  }, [code, allStocks, dispatch]);

  const handleClose = () => {
    history.push('/screening');
  };

  return (
    <div className="stock_description">
      <div className="close_btn">
        <i className="fas fa-undo-alt" onClick={handleClose}>
          戻る
        </i>
      </div>
      {indicators && <Indicators result={indicators} />}
      {tradeHistory && <TradeHistory />}
    </div>
  );
}
