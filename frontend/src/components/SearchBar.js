import React, { useState } from 'react';
import "../styles/components/SearchBar.scss";

export default function SearchBar(props) {
    const [filteredData, setFilteredData] = useState([]);
    const [inputValue,setInputValue] = useState("");
    const { stockList } = props;
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setInputValue(searchWord);
        const newFilter = stockList.filter((stock) => {
            return stock.code.includes(searchWord);
        });
        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    }
    const handleSelect = (event)=>{
        const selectedStock = event.target.textContent.split(":")[1];
        setInputValue(selectedStock);
    }



    return (
        <div className="row center">
            <div className="column search">
                <div className="row search_inputs">
                    <input type="text" placeholder="証券番号を半角で入力してください" value={inputValue} onChange={handleFilter} />
                    <span className="search_icon"> <i className="fas fa-search"></i></span>
                </div>
                {(filteredData.length !== 0) && (
                    <div className="column data_result">
                        {filteredData.slice(0, 15).map((value, key) => {
                            return <p key={key} className="data_item" onClick={handleSelect}>{value.code} : {value.stockname}</p>;
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}