import format from 'pg-format';
import { helper } from '../utils/helper.js';
import { pool } from '../configs/postgresql.js';

export const api = {
    create_prediction: async (payload) => {
        const values = [payload['予想'], payload['戦略'], payload['注目セクター'], payload.user_id]
        const transaction = async () => {
            try {
                await pool.query("BEGIN")
                await pool.query(`
                INSERT INTO market_prediction (prediction,strategy,featured_sector,user_id)
                SELECT $1, $2, $3, $4`, values)
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
        const { user_id,date } = payload
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
    get_one_latest_stock: (payload) => {
        const {code}= payload
        const query = `SELECT * FROM latest_stock_data WHERE code='${code}';`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows[0]
            }).catch((err) => {
                console.error(err.stack)
                return { error: "対象の株価データの取得に失敗しました。" }
            })
        return data;
    },
    upsert_latest_stock: async (values) => {
        const query = format(`
                INSERT INTO latest_stock_data(code,stock_name,market,industry,stock_date,price,change,change_in_percent,previous_close,opening,high,low,vwap,volume,volume_in_percent,trading_value,market_cap,lower_range,upper_range,year_high_date,year_high,year_high_divergence_rate,year_low_date,year_low,year_low_divergence_rate)
                VALUES %L
                ON CONFLICT(code)
                DO UPDATE SET
                    code=EXCLUDED.code,
                    stock_name=EXCLUDED.stock_name,
                    market=EXCLUDED.market,
                    industry=EXCLUDED.industry,
                    stock_date=EXCLUDED.stock_date,
                    price=EXCLUDED.price,
                    change=EXCLUDED.change,
                    change_in_percent=EXCLUDED.change_in_percent,
                    previous_close=EXCLUDED.previous_close,
                    opening=EXCLUDED.opening,
                    high=EXCLUDED.high,
                    low=EXCLUDED.low,
                    vwap=EXCLUDED.vwap,
                    volume=EXCLUDED.volume,
                    volume_in_percent=EXCLUDED.volume_in_percent,
                    trading_value=EXCLUDED.trading_value,
                    market_cap=EXCLUDED.market_cap,
                    lower_range=EXCLUDED.lower_range,
                    upper_range=EXCLUDED.upper_range,
                    year_high_date=EXCLUDED.year_high_date,
                    year_high=EXCLUDED.year_high,
                    year_high_divergence_rate=EXCLUDED.year_high_divergence_rate,
                    year_low_date=EXCLUDED.year_low_date,
                    year_low=EXCLUDED.year_low,
                    year_low_divergence_rate=EXCLUDED.year_low_divergence_rate
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
    get_monthly_profit: (user_id) => {
        const query = `SELECT sum(total_profit_loss) FROM trade_result WHERE user_id = ${user_id} AND created_at::text like '${helper.time().today}%';`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows[0].sum
            }).catch((err) => {
                console.error(err.stack)
                return { error: "データの取得に失敗しました。" }
            })
        return data;
    },
    get_last_profit: (user_id) => {
        const query = `SELECT sum(total_profit_loss) FROM trade_result WHERE user_id = ${user_id} AND created_at::text like '${helper.time().yesterday}%';`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows[0].sum
            }).catch((err) => {
                console.error(err.stack)
                return { error: "データの取得に失敗しました。" }
            })
        return data;
    },
    get_todays_profit: (user_id) => {
        const query = `SELECT sum(total_profit_loss) FROM trade_result WHERE user_id = ${user_id} AND created_at::text like '${helper.time().today}%';`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows[0].sum
            }).catch((err) => {
                console.error(err.stack)
                return { error: "データの取得に失敗しました。" }
            })
        return data;
    },
    get_result: (user_id) => {
        const query = `SELECT * FROM trade_plan JOIN trade_result ON trade_plan.result_id = trade_result.result_id WHERE trade_plan.user_id = ${user_id} AND trade_plan.created_at::text like '${helper.time().today}%';`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows
            }).catch((err) => {
                console.error(err.stack)
                return { error: "結果データの取得に失敗しました。" }
            })
        return data;
    },
    update_result_numbers: async (payload) => {
        const { lot, entry_point, exit_point, result_id, user_id, date } = payload
        const profit_loss = exit_point - entry_point
        const profit_loss_rate = (exit_point - entry_point) / entry_point * 100
        const total_profit_loss = profit_loss * lot
        const values = [lot, entry_point, exit_point, profit_loss, profit_loss_rate.toFixed(1), total_profit_loss]
        const query = `UPDATE trade_result SET lot=$1,entry_point=$2,exit_point=$3,profit_loss=$4, profit_loss_rate=$5,total_profit_loss=$6  WHERE user_id=${user_id} AND result_id=${result_id} AND created_at::text like '${date}%';`
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
            return await api.get_result(user_id)
        } else {
            return { error: "プランの作成に失敗しました。" }
        }
    },
    update_result_comment: async (payload) => {
        const { comment, result_id, user_id } = payload
        const query = `UPDATE trade_result SET comment=$1 WHERE result_id=${result_id};`
        const values = [comment]
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
            return await api.get_result(user_id)
        } else {
            return { error: "プランの更新に失敗しました。" }
        }
    },
    get_one_result: (user_id,date) => {
        const query = `SELECT * FROM trade_plan JOIN trade_result ON trade_plan.result_id = trade_result.result_id WHERE trade_plan.user_id = ${user_id} AND trade_plan.created_at::text like '${date}%';`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows
            }).catch((err) => {
                console.error(err.stack)
                return { error: "結果データの取得に失敗しました。" }
            })
        return data;
    },
    create_plan: async (payload) => {
        const { code, stock_name, market, opening, support, losscut, goal, reason, strategy, user_id } = payload
        const transaction = async () => {
            try {
                await pool.query("BEGIN")
                const result = await pool.query(`INSERT INTO trade_result (user_id)
                VALUES($1) RETURNING result_id;`, [user_id])
                await pool.query(`INSERT INTO trade_plan (code,market,stock_name,opening,support,losscut,goal,reason,strategy,user_id,result_id)
                SELECT $1, $2, $3, $4,$5, $6, $7, $8,$9,$10,$11
                WHERE NOT EXISTS (SELECT plan_id FROM trade_plan WHERE code = ${code} AND user_id = ${user_id} AND created_at::text like '${helper.time().today}%');`, [code, market, stock_name, opening, support, losscut, goal, reason, strategy, user_id, result.rows[0].result_id])
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
            return await api.get_plan(payload)
        } else {
            return { error: "プランの作成に失敗しました。" }
        }
    },
    get_plan: (payload) => {
        const {user_id } = payload
        const query = `SELECT * FROM trade_plan WHERE user_id = ${user_id} AND created_at::text like '${helper.time().today}%' ORDER BY code ASC;`;
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
            return await api.get_plan(payload)
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
            return await api.get_plan(payload)
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
            return await api.get_plan(payload)
        } else {
            return { error: "プランの更新に失敗しました。" }
        }
    },
    delete_plan: async (payload) => {
        const { user_id, code } = payload
        const query1 = `SELECT plan_id, result_id FROM trade_plan WHERE user_id=${user_id} AND code=${code} AND created_at::text like '${helper.time().today}%';`
        const transaction = async () => {
            try {
                await pool.query("BEGIN")
                const res = await pool.query(query1)
                await pool.query(`DELETE FROM trade_plan WHERE plan_id = ${res.rows[0].plan_id};`)
                await pool.query(`DELETE FROM trade_result WHERE result_id = ${res.rows[0].result_id};`)
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
            return await api.get_plan(payload)
        } else {
            return { error: "プランの削除に失敗しました。" }
        }
    },
    create_feed_back: async (payload) => {
        const { title, content, image_url, user_id } = payload
        const transaction = async () => {
            try {
                await pool.query("BEGIN")
                await pool.query(`
                INSERT INTO trade_feed_back (title, content, image_url, user_id)
                VALUES($1, $2, $3, $4)`, [title, content, image_url, user_id])
                await pool.query("COMMIT")
                return "SUCCESS"
            } catch (err) {
                console.log(err.stack)
                await pool.query('ROLLBACK')
            }
        }
        const result = await transaction()
        if (result === "SUCCESS") {
            const res = await pool.query("SELECT * FROM trade_feed_back;")
            return res.rows
        } else {

            return { error: "振り返りの作成に失敗しました。" }
        }
    },
    get_feed_back: (user_id) => {
        const query = `SELECT * FROM trade_feed_back WHERE user_id = ${user_id} ORDER BY created_at ASC;`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows
            }).catch((err) => {
                console.error(err.stack)
                return { error: "プランデータの取得に失敗しました。" }
            })
        return data;
    },
};