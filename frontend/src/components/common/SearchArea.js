import React, { useContext, useState } from "react";
import { AppActions, AppContext } from "../../AppStore";
import { helper } from "../../utils/helper";
import "../../styles/components/SearchArea.scss";
export default function SearchBar() {
  const { state, dispatch } = useContext(AppContext);
  const { allStocks } = state;
  const [filteredData, setFilteredData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const handleFilter = (event) => {
    const searchWord = String(event.target.value);
    const filteredResult = allStocks.filter(
      (stock) =>
        stock.code.includes(helper.FullNumToHalfNum(searchWord)) ||
        stock.stock_name.includes(searchWord)
    );
    setInputValue(searchWord);
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(filteredResult);
    }
  };

  const handleSelect = (code) => {
    const foundData = allStocks.filter((stock) => code === stock.code);
    if (foundData) {
      dispatch({
        type: AppActions.SET_SEARCHED_STOCK,
        payload: foundData[0],
      });
    }
  };

  return (
    <div className="search_area">
      <div className="search_container">
        <div className="search_inputs">
          <input
            data-testid="search_word"
            type="text"
            placeholder="証券番号または会社名を入力してください"
            value={inputValue}
            onChange={handleFilter}
          />
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
                  data-testid={value.code}
                  onClick={() => {
                    handleSelect(value.code);
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
