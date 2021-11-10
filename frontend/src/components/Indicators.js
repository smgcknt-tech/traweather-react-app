
import React,{memo} from 'react';
import "../styles/components/Indicators.scss";
import { helper } from '../utils/helper';

export default memo(function Indicators(props) {
    let {
        stock_name,
        industry,
        previous_close,
        stock_date,
        code,
        opening,
        high,
        low,
        price,
        change,
        change_in_percent,
        vwap,
        volume,
        volume_in_percent,
        year_high,
        year_high_date,
        year_low,
        year_low_date
    } = props.result;
    [stock_date, year_high_date, year_low_date] = helper.format_dates(stock_date, year_high_date, year_low_date);

    return (
        <div className="indicators_body">
            <p id="stock_date">データ更新日: {stock_date}</p>
            <div className="profile">
                <h2 className="stock_name">{stock_name}【{code}】</h2>
                <h2 className="industry">業種（{industry}）</h2>
            </div>
            <div className="indicators">
                <div id="price">
                    <div className="card_value">{price}円</div>
                    <div className="card_title">前日比: {change}円 {change_in_percent}%</div>
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
                    <div className="card_value">{previous_close}円</div>
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
                    <div className="card_value">{volume_in_percent}%</div>
                    <div className="card_title">出来高増加率</div>
                </div>
                <div id="year_high">
                    <div className="card_value">{year_high}円</div>
                    <div className="card_title">年初来高値<span>{year_high_date}</span></div>
                </div>
                <div id="year_low">
                    <div className="card_value">{year_low}円</div>
                    <div className="card_title">年初来安値<span>{year_low_date}</span></div>
                </div>
            </div>
        </div>
    );
});
