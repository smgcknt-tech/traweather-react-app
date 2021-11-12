import React, { useContext, useEffect } from 'react';
import '../../src/styles/pages/ScreeningPage.scss';
import { AppActions, AppContext } from '../AppStore';
import SearchArea from '../components/common/SearchArea';
import StockDescription from '../components/common/StockDescription';
import { helper } from '../utils/helper';

export default function ScreeningPage() {
  const { state, dispatch } = useContext(AppContext);
  const { searchedStock, allStocks} = state;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedStocks = await helper.fetchData(`/api/latest_stock`, dispatch, AppActions);
      if (fetchedStocks) dispatch({ type: AppActions.SET_ALL_STOCKS, payload: fetchedStocks });

    };
    fetchData();
  }, []);

  return (
    <div className="screening_page">
      {!searchedStock && <div className="center_area">{allStocks && <SearchArea />}</div>}
      {searchedStock && <StockDescription />}
    </div>
  );
}
