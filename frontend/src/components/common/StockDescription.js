import React, { useContext, useEffect } from 'react';
import { AppActions, AppContext } from '../../AppStore';
import { helper } from '../../utils/helper';
import Indicators from '../../components/Indicators';
import TradeHistry from './TradeHistry';
import Message from './Message';
import '../../styles/components/StockDescription.scss'

export default function StockDescription() {
  const { state, dispatch } = useContext(AppContext);
  const { searchedStock, allStocks, indicators, tradeHistry } = state;

  useEffect(() => {
    const indicatorsData = allStocks.find((stock) => searchedStock.code === stock.code);
    if (indicatorsData) dispatch({ type: AppActions.SET_INDICATORS, payload: indicatorsData });
  }, []); // eslint-disable-line

  useEffect(() => {
    (async () => {
      const fetchedHistry = await helper.fetchData(`/api/trade_histry`, dispatch, AppActions, {
        code: searchedStock.code,
      });
      if (fetchedHistry.length > 0) dispatch({ type: AppActions.SET_TRADE_HISTRY, payload: fetchedHistry });
    })();
  }, [searchedStock]); // eslint-disable-line

  const handleClose = () => {
    dispatch({ type: AppActions.SET_SEARCHED_STOCK, payload: null });
    dispatch({ type: AppActions.SET_TRADE_HISTRY, payload: null });
  };

  return (
    <div className="stock_description">
      <div className="close_btn">
        <i className="fas fa-undo-alt" onClick={handleClose}>
          検索画面に戻る
        </i>
      </div>
      {indicators && <Indicators result={indicators} />}
      {tradeHistry ? <TradeHistry /> : <Message>トレード実績なし</Message>}
    </div>
  );
}
