import format from 'pg-format';
import { pool } from '../../postgresql.js';
import { env } from '../../env_variables.js';
export const api = {
    create_prediction: async (payload) => {
        const values = [payload['予想'], payload['戦略'], payload['注目セクター'], payload.user_id]
        const transaction = async () => {
            try {
                await pool.query("BEGIN")
                await pool.query(`INSERT INTO market_prediction (prediction,strategy,featuredsector,user_id) VALUES($1, $2, $3, $4);`, values)
                await pool.query("COMMIT")
                const res = await pool.query("SELECT * FROM market_prediction;")
                return res.rows
            } catch (err) {
                await pool.query('ROLLBACK')
            }
        }
        const res = await transaction()
        return res
    },
    update_prediction: async (payload) => {
        const {created_at} = payload
        const column = Object.keys(payload)[0]
        const value = [payload[column]]
        const query = `UPDATE market_prediction SET ${column}=$1 WHERE created_at::text like '${created_at}%';`
        await pool.query(query, value)
        const data = await api.get_todays_prediction(created_at)
        return data;
    },
    get_todays_prediction: (date) => {
        const query = `SELECT * FROM market_prediction WHERE created_at::text like '${date}%';`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows[0]
            }).catch((err) => {
                console.error(err.stack)
            })
        return data;
    },
    get_latest_stock: () => {
        const query = `SELECT * FROM latest_stock_data WHERE code NOT IN ( '0001', '0002' );`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows
            }).catch((err) => {
                console.error(err.stack)
            })
        return data;
    },
    get_one_latest_stock: (code) => {
        const query = `SELECT * FROM latest_stock_data WHERE code=$1;`;
        const data = pool.query(query, [code])
            .then((res) => {
                return res.rows[0]
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
    create_plan: async (payload) => {
        const { code, opening, support, losscut, goal, reason, strategy, user_id } = payload
        const res = await api.get_one_latest_stock(code)
        const query = `INSERT INTO plan (code,market,stockname,opening,support,losscut,goal,reason,strategy,user_id)
                       VALUES($1, $2, $3, $4,$5, $6, $7, $8,$9,$10);`
        const values = [code, res.market, res.stockname, opening, support, losscut, goal, reason, strategy, user_id];
        const data = await pool.query(query, values)
            .then((res) => {
                return res.rows
            }).catch((err) => {
                console.error(err.stack)
            })
        return data
    },
    get_plan: (user_id) => {
        const query = `SELECT * FROM plan WHERE user_id = ${user_id}  ORDER BY code ASC;`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows
            }).catch((err) => {
                console.error(err.stack)
            })
        return data;
    },
    update_plan: async (payload) => {
        const { opening, support, losscut, goal, user_id, code } = payload
        const query = `UPDATE plan SET opening=$1,support=$2,losscut=$3,goal=$4 WHERE user_id=${user_id} AND code=${code};`
        await pool.query(query, [opening, support, losscut, goal])
        const data = await api.get_plan(user_id)
        return data;
    },
    update_plan_reason: async (payload) => {
        const { reason, user_id, code } = payload
        const query = `UPDATE plan SET reason=$1 WHERE user_id=${user_id} AND code=${code};`
        await pool.query(query, [reason])
        const data = await api.get_plan(user_id)
        return data;
    },
    update_plan_strategy: async (payload) => {
        const { strategy, user_id, code } = payload
        const query = `UPDATE plan SET strategy=$1 WHERE user_id=${user_id} AND code=${code};`
        await pool.query(query, [strategy])
        const data = await api.get_plan(user_id)
        return data;
    },
    delete_plan: async (payload) => {
        const { user_id, code } = payload
        const query = `DELETE FROM plan WHERE user_id=${user_id} AND code=${code};`
        await pool.query(query)
        const data = await api.get_plan(user_id)
        return data;

    },
};