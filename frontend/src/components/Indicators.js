import React from 'react'
import "../styles/components/Indicators.scss";

export default function Indicators({
    stockname,
    industry,
    previousclose,
    stockdate,
    code,
    opening,
    high,
    low,
    price,
    change,
    changeinpercent,
    vwap,
    volume,
    volumeinpercent,
    yearhigh,
    yearhighdate,
    yearlow,
    yearlowdate
}) {
    return (
        <div className="indicators_body">
            <p id="stockDate">データ更新日: {stockdate}</p>
            <div className="row">
                <h2 className="stock_name">{stockname}【{code}】</h2>
                <h2 className="industry">業種（{industry}）</h2>
            </div>
            <div className="row indicators">
                <div id="price">
                    <div className="card_value">{price}円</div>
                    <div className="card_title">前日比: {change}円 {changeinpercent}%</div>
                </div>
                <div id="opening">
                    <div className="card_value">{opening}円</div>
                    <div className="card_title">始値</div>
                </div>
                <div id="high">
                    <div className="card_value">{high}円</div>
                    <div className="card_title">高値</div>
                </div>
                <div id="low">
                    <div className="card_value">{low}円</div>
                    <div className="card_title">安値</div>
                </div>
                <div id="previous_close">
                    <div className="card_value">{previousclose}円</div>
                    <div className="card_title">前日終値</div>
                </div>
                <div id="vwap">
                    <div className="card_value">{vwap}円</div>
                    <div className="card_title">VWAP</div>
                </div>
                <div id="volume">
                    <div className="card_value">{volume}株</div>
                    <div className="card_title">出来高</div>
                </div>
                <div id="volume_percent">
                    <div className="card_value">{volumeinpercent}%</div>
                    <div className="card_title">出来高増加率</div>
                </div>
                <div id="year_high">
                    <div className="card_value">{yearhigh}円</div>
                    <div className="card_title">年初来高値<span>{yearhighdate}</span></div>
                </div>
                <div id="year_low">
                    <div className="card_value">{yearlow}円</div>
                    <div className="card_title">年初来安値<span>{yearlowdate}</span></div>
                </div>
            </div>
        </div>
    )
}
