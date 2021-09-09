import format from 'pg-format';
import { pool } from '../../postgresql.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../../env_variables.js';
export const api = {
    register_user: async (payload) => {
        const { username, password } = payload;
        const res = await bcrypt.hash(password, 5).then(async (hash) => {
            try {
                await pool.query("BEGIN")
                await pool.query(`INSERT INTO users (username,password) VALUES($1, $2);`, [username, hash])
                await pool.query("COMMIT")
                const res = await pool.query("SELECT * FROM users;")
                return res.rows
            } catch (err) {
                await pool.query('ROLLBACK')
            }
        })
        return res;
    },
    login_user: async (payload) => {
        const { username, password } = payload;
        const user = await pool.query(`SELECT * FROM users WHERE username = '${username}'`).then(res => res.rows[0])
        if (!user) {
            return { error: "user doesn't exist" }
        } else {
            const res = await bcrypt.compare(password, user.password)
                .then((match) => {
                    if (!match) {
                        return { error: "wrong username and password" }
                    } else {
                        const access_token = jwt.sign({ username: username, id: user.id }, env.jwt_secret_key)
                        return access_token
                    }
                })
            return res
        }
    },
    create_prediction: async (form_data) => {
        const transaction = async () => {
            try {
                await pool.query("BEGIN")
                await pool.query(`INSERT INTO market_prediction (prediction,strategy,featuredsector) VALUES($1, $2, $3);`, [form_data['予想'], form_data['戦略'], form_data['注目セクター']])
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
    update_prediction: async (payload, date) => {
        const column = Object.keys(payload)[0]
        const value = [payload[column]]
        const query = `UPDATE market_prediction
                       SET ${column}=$1
                       WHERE created_at::text like '${date}%';`
        await pool.query(query, value)
        const data = await sql.get_todays_prediction(date)
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
    create_plan: async (form_data) => {
        const { code, opening, support, losscut, goal, reason, strategy } = form_data
        const res = await sql.get_one_latest_stock(code)
        const query = `INSERT INTO plan (code,market,stockname,opening,support,losscut,goal,reason,strategy)
                      VALUES($1, $2, $3, $4,$5, $6, $7, $8,$9);`
        const values = [code, res.market, res.stockname, opening, support, losscut, goal, reason, strategy];
        const data = await pool.query(query, values)
            .then((res) => {
                return res.rows
            }).catch((err) => {
                console.error(err.stack)
            })
        return data
    },
    get_plan: () => {
        const query = `SELECT * FROM plan ORDER BY code ASC;`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows
            }).catch((err) => {
                console.error(err.stack)
            })
        return data;
    },
    update_plan: async (payload, code) => {
        const { opening, support, losscut, goal } = payload
        const query = `UPDATE plan
                       SET opening=$1,support=$2,losscut=$3,goal=$4
                       WHERE code=${code};`
        await pool.query(query, [opening, support, losscut, goal])
        const data = await sql.get_plan()
        return data;
    },
    update_plan_reason: async (payload, code) => {
        const { reason } = payload
        const query = `UPDATE plan
        SET reason=$1
        WHERE code=${code};`
        await pool.query(query, [reason])
        const data = await sql.get_plan()
        return data;
    },
    update_plan_strategy: async (payload, code) => {
        const { strategy } = payload
        const query = `UPDATE plan
        SET strategy=$1
        WHERE code=${code};`
        await pool.query(query, [strategy])
        const data = await sql.get_plan()
        return data;
    },
    delete_plan: async (code) => {
        const query = `DELETE FROM plan WHERE code=${code};`
        await pool.query(query)
        const data = await sql.get_plan()
        return data;

    }
};