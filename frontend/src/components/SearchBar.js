import React, { useContext, useState } from 'react';
import "../styles/components/SearchBar.scss";
import axios from 'axios';
import Indicators from './Indicators';
import { PlanReducer } from '../pages/PlanPage'
export default function SearchBar() {
    const { state } = useContext(PlanReducer);
    const { allStocks } = state;
    const [filteredData, setFilteredData] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [resultData, setResultData] = useState(null)
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
    const handleSelect = (event) => {
        const code = event.target.textContent.split(":")[0];
        const selectedStock = event.target.textContent.split(":")[1];
        setInputValue(selectedStock);
        setFilteredData([])
        const fetchData = () => {
            const url = `/api/fetch_latest_stock/${code}`
            axios.get(url).then((res) => { setResultData(res.data) })
        }
        fetchData();
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
            {(resultData) && (<Indicators {...resultData} />)}
        </div>
    )
}