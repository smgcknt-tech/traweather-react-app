import format from 'pg-format';
import { pool } from '../../postgresql.js';
export const sql = {
    get_latest_stock: () => {
        const query = `SELECT code, stockname FROM latest_stock_data WHERE code NOT IN ( '0001', '0002' ) ORDER BY code ASC;`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows
            }).catch((err) => {
                console.error(err.stack)
            })
        return data;
    },
    get_one_latest_stock: (code) => {
        const query = `SELECT * FROM latest_stock_data WHERE code='${code}';`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows
            }).catch((err) => {
                console.error(err.stack)
            })
        return data;
    },
    upsert_latest_stock: (values) => {
        const query = format(`
                INSERT INTO latest_stock_data(code,stockName,market,industry,stockDate,price,change,changeInPercent,previousClose,opening,high,low,vwap,volume,volumeInPercent,tradingValue,marketCap,lowerRange,upperRange,yearHighDate,yearHigh,yearHighDivergenceRate,yearLowDate,yearLow,yearLowDivergenceRate)
                VALUES %L
                ON CONFLICT(code)
                DO UPDATE SET
                    code=EXCLUDED.code,
                    stockName=EXCLUDED.stockName,
                    market=EXCLUDED.market,
                    industry=EXCLUDED.industry,
                    stockDate=EXCLUDED.stockDate,
                    price=EXCLUDED.price,
                    change=EXCLUDED.change,
                    changeInPercent=EXCLUDED.changeInPercent,
                    previousClose=EXCLUDED.previousClose,
                    opening=EXCLUDED.opening,
                    high=EXCLUDED.high,
                    low=EXCLUDED.low,
                    vwap=EXCLUDED.vwap,
                    volume=EXCLUDED.volume,
                    volumeInPercent=EXCLUDED.volumeInPercent,
                    tradingValue=EXCLUDED.tradingValue,
                    marketCap=EXCLUDED.marketCap,
                    lowerRange=EXCLUDED.lowerRange,
                    upperRange=EXCLUDED.upperRange,
                    yearHighDate=EXCLUDED.yearHighDate,
                    yearHigh=EXCLUDED.yearHigh,
                    yearHighDivergenceRate=EXCLUDED.yearHighDivergenceRate,
                    yearLowDate=EXCLUDED.yearLowDate,
                    yearLow=EXCLUDED.yearLow,
                    yearLowDivergenceRate=EXCLUDED.yearLowDivergenceRate
                RETURNING *;
                `, values);
        const data = pool.query(query, [])
            .then((res) => {
                return `${res.rows.length} of streamed csv data is upserted into latest_stock_data table...`
            }).catch((err) => {
                console.error(err.stack)
            })
        return data
    },
    insert_plan:async(form_data)=>{
        const { code, market, stockname, opening, support, losscut, goal, reason, strategy } = form_data
        const query =`INSERT INTO plan (code,market,stockname,opening,support,losscut,goal,reason,strategy)
                      VALUES($1, $2, $3, $4,$5, $6, $7, $8,$9);`
        const values=[code, market, stockname, opening, support, losscut, goal, reason, strategy];
        const data = await pool.query(query, values)
            .then((res) => {
                return res.rows
            }).catch((err) => {
                console.error(err.stack)
            })
        return data
    }
};