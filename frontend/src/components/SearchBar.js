import React, { memo, useCallback, useContext, useState } from 'react';
import { context } from '../stores/PlanPage'
import "../styles/components/SearchBar.scss";
import Indicators from './Indicators';
export default memo(function SearchBar() {
    const { state} = useContext(context);
    const { allStocks} = state;
    const [filteredData, setFilteredData] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState(null);

    const handleFilter = useCallback((event) => {
        const searchWord = String(event.target.value);
        const newFilter = allStocks.filter((stock) => stock.code.includes(searchWord) || stock.stockname.includes(searchWord));
        setInputValue(searchWord);
        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    }, [allStocks])

    const hundleSelect = useCallback((e, code, stockname) => {
        const data = allStocks.filter((stock) => code === stock.code );
        setInputValue(stockname);
        setFilteredData([]);
        setResult(data[0]);
    }, [allStocks])

    return (
        <div className="search">
            <div className="search_container">
                <div className="search_inputs">
                    <input type="text" placeholder="証券番号または会社名を入力してください" value={inputValue} onChange={handleFilter} />
                    <span className="search_icon">{result ? <i className="fas fa-times" onClick={()=>{setResult(null)}}></i> : <i className="fas fa-search"></i>}</span>
                </div>
                {(filteredData.length > 0) && (
                    <div className="data_result">
                        {filteredData.slice(0, 15).map((value, key) => {
                            return <p key={key} className="data_item" onClick={(e) => { hundleSelect(e,value.code,value.stockname)}}>{value.code}:{value.stockname}</p>;
                        })}
                    </div>
                )}
            </div>
            {(result) && (<Indicators result={result} />)}
        </div>
    )
})