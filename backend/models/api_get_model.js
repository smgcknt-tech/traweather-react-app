import { helper } from '../utils/helper.js';
import { pool } from '../configs/postgresql.js';

export const api_get_model = {
    get_prediction: (payload) => {
        const { user_id, date } = payload
        const query = `
            SELECT * FROM market_prediction
            WHERE user_id =${user_id} AND created_at::text like '${date}%';`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows[0]
            }).catch((err) => {
                console.error(err.stack)
            })
        return data;
    },
    get_latest_stock: () => {
        const query = `
            SELECT * FROM latest_stock_data
            WHERE code NOT IN ( '0001', '0002' );`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows
            }).catch((err) => {
                console.error(err.stack)
            })
        return data;
    },
    get_one_latest_stock: (payload) => {
        const { code } = payload
        const query = `
            SELECT * FROM latest_stock_data
            WHERE code='${code}';`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows[0]
            }).catch((err) => {
                console.error(err.stack)
            })
        return data;
    },
    get_results: async (payload) => {
        const { user_id } = payload
        const query1 = `
            SELECT * FROM trade_plan JOIN trade_result ON trade_plan.result_id = trade_result.result_id
            WHERE trade_plan.user_id = ${user_id} AND trade_plan.created_at::text like '${helper.time().today}%';`;
        const query2 = `
            SELECT to_char(created_at, 'YYYY-MM') AS month,
            SUM(total_profit_loss)
            FROM trade_result
            WHERE user_id = 11 AND to_char(created_at, 'YYYY-MM') = '${helper.time().thisMonth}'
            GROUP BY month;`;
        const query3 = `
            SELECT sum(total_profit_loss) FROM trade_result
            WHERE user_id = ${user_id} AND created_at::text like '${helper.time().yesterday}%';`
        const query4 = `
            SELECT sum(total_profit_loss) FROM trade_result
            WHERE user_id = ${user_id} AND created_at::text like '${helper.time().today}%';`;
        try {
            const resultData = await pool.query(query1);
            const monthly_profit = await pool.query(query2)
            const last_profit = await pool.query(query3)
            const todays_profit = await pool.query(query4)
            console.log(resultData.rows)
            return {
                resultData: resultData.rows,
                monthly_profit: monthly_profit.rows[0].sum,
                last_profit: last_profit.rows[0].sum,
                todays_profit: todays_profit.rows[0].sum,
                check: monthly_profit.rows,
                check2: query2
            };
        } catch (err) {
            console.log(err)
        }
    },
    get_one_result: (payload) => {
        const { user_id, date } = payload
        const query = `
            SELECT * FROM trade_plan JOIN trade_result ON trade_plan.result_id = trade_result.result_id
            WHERE trade_plan.user_id = ${user_id} AND trade_plan.created_at::text like '${date}%';`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows
            }).catch((err) => {
                console.error(err.stack)
            })
        return data;
    },
    get_plan: (payload) => {
        const { user_id } = payload
        const query = `
            SELECT * FROM trade_plan
            WHERE user_id = ${user_id} AND created_at::text like '${helper.time().today}%'
            ORDER BY code ASC;`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows
            }).catch((err) => {
                console.error(err.stack)
            })
        return data;
    },
    get_feed_back: (payload) => {
        const { user_id } = payload
        const query = `
            SELECT * FROM trade_feed_back
            WHERE user_id = ${user_id}
            ORDER BY created_at ASC;`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows
            }).catch((err) => {
                console.error(err.stack)
            })
        return data;
    },
};