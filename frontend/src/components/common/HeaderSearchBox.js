import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { AppActions, AppContext } from '../../AppStore';
import '../../styles/components/HeaderSearchBox.scss';
import { helper } from '../../utils/helper';

export default function HeaderSearchBox() {
  const { state, dispatch } = useContext(AppContext);
  const { allStocks } = state;
  const [inputValue, setInputValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get(`/api/latest_stock`);
      if (data) dispatch({ type: AppActions.SET_ALL_STOCKS, payload: data });
    };
    fetchData();
  }, []); // eslint-disable-line

  const handleFilter = (event) => {
    const searchWord = String(event.target.value);
    const filteredResult = allStocks.filter(
      (stock) => stock.code.includes(helper.FullNumToHalfNum(searchWord)) || stock.stock_name.includes(searchWord)
    );
    setInputValue(searchWord);
    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(filteredResult);
    }
  };

  const handleSelect = (code) => {
    history.push({ pathname: '/search', state: code });
  };

  if (!allStocks) return null
    return (
      <div className="header_search_box">
        <div className="search_container">
          <div className="search_inputs">
            <input type="text" placeholder="証券番号を入力してください" value={inputValue} onChange={handleFilter} />
            <span className="search_icon">
              <i className="fas fa-search"></i>
            </span>
          </div>
          {filteredData.length > 0 && (
            <div className="data_result">
              {filteredData.slice(0, 15).map((value, key) => {
                return (
                  <p
                    key={key}
                    className="data_item"
                    onClick={() => {
                      handleSelect(value.code, value.stock_name);
                    }}
                  >
                    {value.code}_{value.stock_name}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
}
