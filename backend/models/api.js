import format from 'pg-format';
import { helper } from '../utils/helper.js';
import { pool } from '../../postgresql.js';
// import { env } from '../../env_variables.js';
export const api = {
    create_prediction: async (payload) => {
        const values = [payload['予想'], payload['戦略'], payload['注目セクター'], payload.user_id, payload.date]
        const transaction = async () => {
            try {
                await pool.query("BEGIN")
                await pool.query(`
                INSERT INTO market_prediction (prediction,strategy,featured_sector,user_id,created_at)
                SELECT $1, $2, $3, $4, $5`, values)
                await pool.query("COMMIT")
                return "SUCCESS"
            } catch (err) {
                console.log(err.stack)
                await pool.query('ROLLBACK')
            }
        }
        const result = await transaction()
        if (result === "SUCCESS") {
            const res = await pool.query("SELECT * FROM market_prediction;")
            return res.rows
        } else {
            return { error: "市場予想の作成に失敗しました。" }
        }
    },
    update_prediction: async (payload) => {
        const { created_at, user_id } = payload
        const column = Object.keys(payload)[0]
        const values = [payload[column]]
        const query = `UPDATE market_prediction SET ${column}=$1 WHERE user_id =${user_id} AND created_at::text like '${created_at}%' RETURNING *;`
        const transaction = async () => {
            try {
                await pool.query("BEGIN")
                const result = await pool.query(query, values)
                await pool.query("COMMIT")
                return result.rows[0]
            } catch (err) {
                await pool.query('ROLLBACK')
                console.log(err.stack)
                return "FAILED"
            }
        }
        const result = await transaction()
        if (result !== "FAILED") {
            return result
        } else {
            return { error: "市場予想の更新に失敗しました。" }
        }
    },
    get_one_prediction: (payload) => {
        const { user_id, date } = payload
        const query = `SELECT * FROM market_prediction WHERE user_id =${user_id} AND created_at::text like '${date}%';`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows[0]
            }).catch((err) => {
                console.error(err.stack)
                return { error: "市場予想の取得に失敗しました。" }
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
                return { error: "最新の株価データの取得に失敗しました。" }
            })
        return data;
    },
    upsert_latest_stock: async (values) => {
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
        const transaction = async () => {
            try {
                await pool.query("BEGIN")
                const result = await pool.query(query, [])
                await pool.query("COMMIT")
                return result.rows
            } catch (err) {
                await pool.query('ROLLBACK')
                console.log(err.stack)
                return "FAILED"
            }
        }
        const result = await transaction()
        if (result !== "FAILED") {
            return `${result.length} of streamed csv data is upserted into latest_stock_data table...`
        } else {
            return { error: "failed inserting csv data" }
        }
    },
    create_plan: async (payload) => {
        const { code, stock_name, market, opening, support, losscut, goal, reason, strategy, user_id } = payload
        const query = `INSERT INTO trade_plan (code,market,stock_name,opening,support,losscut,goal,reason,strategy,user_id,created_at)
                       VALUES($1, $2, $3, $4,$5, $6, $7, $8,$9,$10,$11);`
        const values = [code, market, stock_name, opening, support, losscut, goal, reason, strategy, user_id, helper.get_today()];
        const transaction = async () => {
            try {
                await pool.query("BEGIN")
                await pool.query(query, values)
                await pool.query("COMMIT")
                return "SUCCESS"
            } catch (err) {
                await pool.query('ROLLBACK')
                console.log(err.stack)
                return "FAILED"
            }
        }
        const result = await transaction()
        if (result !== "FAILED") {
            return await api.get_plan(user_id)
        } else {
            return { error: "プランの作成に失敗しました。" }
        }
    },
    get_plan: (user_id) => {
        const query = `SELECT * FROM trade_plan WHERE user_id = ${user_id} ORDER BY code ASC;`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows
            }).catch((err) => {
                console.error(err.stack)
                return { error: "プランデータの取得に失敗しました。" }
            })
        return data;
    },
    update_plan_numbers: async (payload) => {
        const { opening, support, losscut, goal, user_id, code } = payload
        const values = [opening, support, losscut, goal]
        const query = `UPDATE trade_plan SET opening=$1,support=$2,losscut=$3,goal=$4 WHERE user_id=${user_id} AND code=${code};`
        const transaction = async () => {
            try {
                await pool.query("BEGIN")
                await pool.query(query, values)
                await pool.query("COMMIT")
                return "SUCCESS"
            } catch (err) {
                await pool.query('ROLLBACK')
                console.log(err.stack)
                return "FAILED"
            }
        }
        const result = await transaction()
        if (result === "SUCCESS") {
            return await api.get_plan(user_id)
        } else {
            return { error: "プランの作成に失敗しました。" }
        }
    },
    update_plan_reason: async (payload) => {
        const { reason, user_id, code } = payload
        const query = `UPDATE trade_plan SET reason=$1 WHERE user_id=${user_id} AND code=${code};`
        const values = [reason]
        const transaction = async () => {
            try {
                await pool.query("BEGIN")
                await pool.query(query, values)
                await pool.query("COMMIT")
                return "SUCCESS"
            } catch (err) {
                await pool.query('ROLLBACK')
                console.log(err.stack)
                return "FAILED"
            }
        }
        const result = await transaction()
        if (result === "SUCCESS") {
            return await api.get_plan(user_id)
        } else {
            return { error: "プランの更新に失敗しました。" }
        }
    },
    update_plan_strategy: async (payload) => {
        const { strategy, user_id, code } = payload
        const values = [strategy]
        const query = `UPDATE trade_plan SET strategy=$1 WHERE user_id=${user_id} AND code=${code};`
        const transaction = async () => {
            try {
                await pool.query("BEGIN")
                await pool.query(query, values)
                await pool.query("COMMIT")
                return "SUCCESS"
            } catch (err) {
                await pool.query('ROLLBACK')
                console.log(err.stack)
                return "FAILED"
            }
        }
        const result = await transaction()
        if (result === "SUCCESS") {
            return await api.get_plan(user_id)
        } else {
            return { error: "プランの更新に失敗しました。" }
        }
    },
    delete_plan: async (payload) => {
        const { user_id, code } = payload
        const query = `DELETE FROM trade_plan WHERE user_id=${user_id} AND code=${code};`
        const transaction = async () => {
            try {
                await pool.query("BEGIN")
                await pool.query(query)
                await pool.query("COMMIT")
                return "SUCCESS"
            } catch (err) {
                await pool.query('ROLLBACK')
                console.log(err.stack)
                return "FAILED"
            }
        }
        const result = await transaction()
        if (result === "SUCCESS") {
            return await api.get_plan(user_id)
        } else {
            return { error: "プランの削除に失敗しました。" }
        }
    },
};