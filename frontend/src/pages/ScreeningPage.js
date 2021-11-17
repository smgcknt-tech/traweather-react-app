import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { AppActions, AppContext } from '../AppStore';
import SearchBox from '../components/SearchBox';
import '../styles/pages/ScreeningPage.scss';

export default function ScreeningPage() {
  const {dispatch } = useContext(AppContext);
  let history = useHistory();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/latest_stock`);
      if (data) dispatch({ type: AppActions.SET_ALL_STOCKS, payload: data });
    })();
  }, []); // eslint-disable-line
  const handleClick = () => {
    history.push({ pathname: '/pickup', state: 'favorite' });
  };
  return (
    <div className="screening_page">
      <div className="center_area">
        <SearchBox />
        <div className="pickup">
          <div>
            <h2>PICKUP</h2>
            <ul className="stock_list">
              <li onClick={handleClick}>お得意銘柄</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
