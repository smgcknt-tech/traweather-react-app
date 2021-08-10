import React from 'react'
import "../styles/components/SearchBar.scss";

export default function SearchBar(props) {
    const { stockList } = props
    return (
        <div className="row center">
            <div className="column search">
                <div className="row searchInputs">
                    <input type="text" placeholder="証券番号を入力してください" />
                    <span className="searchIcon"><i className="fas fa-search"></i></span>
                </div>
                <div className="row dataResult">
                    {stockList.map((value, key) => {
                        return <p className="dataItem">{value.code}:{value.stockname}</p>
                    })}
                </div>
            </div>
        </div>
    )
}
