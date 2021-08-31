import React, { useContext, useState } from 'react';
import { context, actions } from '../stores/PlanPage'
import "../styles/components/SearchBar.scss";
import Indicators from './Indicators';
import { helper } from '../utils/helper';
export default function SearchBar() {
    const { state, dispatch } = useContext(context);
    const { allStocks, searchResult } = state;
    const [filteredData, setFilteredData] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const handleFilter = (event) => {
        const searchWord = String(event.target.value);
        const newFilter = allStocks.filter((stock) => {
            let results;
            (stock.code.includes(searchWord) || stock.stockname.includes(searchWord)) ? results = stock : results = null;
            return results
        });
        setInputValue(searchWord);
        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    }
    const handleSelect = (e) => {
        const code = e.target.textContent.split(":")[0];
        const selectedStock = e.target.textContent.split(":")[1];
        setInputValue(selectedStock);
        setFilteredData([])
        helper.fecthData(`/api/fetch_latest_stock/${code}`, dispatch, actions)
            .then((data) => {
                dispatch({ type: actions.SET_SEARCH_RESULT, payload: data });
                
            });
    }
    return (
        <div className="search">
            <div className="search_container">
                <div className="search_inputs">
                    <input type="text" placeholder="証券番号または会社名を入力してください" value={inputValue} onChange={handleFilter} />
                    <span className="search_icon"> <i className="fas fa-search"></i></span>
                </div>
                {(filteredData.length !== 0) && (
                    <div className="data_result">
                        {filteredData.slice(0, 15).map((value, key) => {
                            return <p key={key} className="data_item" onClick={handleSelect}>{value.code} :{value.stockname}</p>;
                        })}
                    </div>
                )}
            </div>
            {(searchResult) && (<Indicators />)}
        </div>
    )
}