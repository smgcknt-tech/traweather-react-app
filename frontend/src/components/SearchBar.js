import React, { useContext, useState } from 'react';
import { AppContext } from '../stores/App';
import "../styles/components/SearchBar.scss";
import Indicators from './Indicators';
export default function SearchBar() {
    const { state : AppState } = useContext(AppContext);
    const { allStocks } = AppState;
    const [filteredData, setFilteredData] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState(null);

    const handleFilter = (event) => {
        const searchWord = String(event.target.value);
        const filteredResult = allStocks.filter((stock) => stock.code.includes(searchWord) || stock.stock_name.includes(searchWord));
        setInputValue(searchWord);
        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(filteredResult);
        }
    }

    const handleSelect = (code, stock_name) => {
        const foundData = allStocks.filter((stock) => code === stock.code);
        setInputValue(stock_name);
        setFilteredData([]);
        setResult(foundData[0]);
    }

    const handleClear = () => {
        setInputValue("");
        setResult(null)
    }

    return (
        <div className="search">
            <div className="search_container">
                <div className="search_inputs">
                    <input type="text" placeholder="証券番号または会社名を入力してください" value={inputValue} onChange={handleFilter} />
                    <span className="search_icon">
                        {result ? <i className="fas fa-times" onClick={handleClear}></i> : <i class="fas fa-search"></i>}
                    </span>
                </div>
                {(filteredData.length > 0) && (
                    <div className="data_result">
                        {filteredData
                            .slice(0, 15)
                            .map((value, key) => {
                                return (
                                    <p key={key} className="data_item" onClick={() => { handleSelect(value.code, value.stock_name) }}>
                                        {value.code}_{value.stock_name}
                                    </p>
                                );
                            })}
                    </div>
                )}
            </div>
            {(result) && (<Indicators result={result} />)}
        </div>
    )
}