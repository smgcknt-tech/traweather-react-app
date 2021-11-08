import { helper } from '../utils/helper.js';
import { pool } from '../configs/postgresql.js';

export const api_get_model = {
    get_prediction: async (payload) => {
        const { user_id, date } = payload;
        const query = `
            SELECT *
            FROM market_prediction
            WHERE user_id =${user_id} AND to_char( created_at, 'YYYY-MM-DD' ) = '${date}';`;
        try {
            const res = await pool.query(query);
            return res.rows[0];
        } catch (err) {
            console.error(err.stack);
        };
    },
    get_latest_stock: async () => {
        const query = `
            SELECT *
            FROM latest_stock_data
            WHERE code NOT IN ( '0001', '0002' );`;
        try {
            const res = await pool.query(query);
            return res.rows;
        } catch (err) {
            console.error(err.stack);
        };
    },
    get_results: async (payload) => {
        const { user_id } = payload;
        const query1 = `
            SELECT *
            FROM trade_plan
            JOIN trade_result ON trade_plan.result_id = trade_result.result_id
            AND to_char( trade_plan.created_at, 'YYYY-MM-DD' ) = '${helper.time().today}';`;
        const query2 = `
            SELECT to_char(created_at, 'YYYY-MM') AS month,
            SUM(total_profit_loss)
            FROM trade_result
            WHERE user_id = ${user_id} AND to_char(created_at, 'YYYY-MM') = '${helper.time().thisMonth}'
            GROUP BY month;`;
        const query3 = `
            SELECT SUM(total_profit_loss)
            FROM trade_result
            WHERE user_id = ${user_id} AND to_char( created_at, 'YYYY-MM-DD' ) = '${helper.time().yesterday}'`;
        try {
            const resultData = await pool.query(query1);
            const monthly_profit = await pool.query(query2);
            const last_profit = await pool.query(query3);
            const dataSets = {
                resultData: resultData.rows,
                monthly_profit: monthly_profit.rows[0].sum || 0,
                last_profit: last_profit.rows[0].sum || 0,
            };
            return dataSets;
        } catch (err) {
            console.error(err.stack);
        };
    },
    get_one_result: async (payload) => {
        const { date } = payload;
        const query = `
            SELECT *
            FROM trade_plan
            JOIN trade_result ON trade_plan.result_id = trade_result.result_id
            AND to_char( trade_plan.created_at, 'YYYY-MM-DD' ) = '${date}';`;
        try {
            const res = await pool.query(query);
            return res.rows;
        } catch (err) {
            console.error(err.stack);
        };
    },
    get_plan: async (payload) => {
        const { user_id } = payload;
        const query = `
            SELECT * FROM trade_plan
            WHERE user_id = ${user_id} AND to_char(created_at, 'YYYY-MM-DD') = '${helper.time().today}'
            ORDER BY code ASC;`;
        try {
            const res = await pool.query(query);
            return res.rows;
        } catch (err) {
            console.error(err.stack);
        };
    },
    get_feed_back: async (payload) => {
        const { user_id } = payload;
        const query = `
            SELECT * FROM trade_feed_back
            WHERE user_id = ${user_id}
            ORDER BY created_at ASC;`;
        try {
            const res = await pool.query(query);
            return res.rows;
        } catch (err) {
            console.error(err.stack);
        };
    },
    limit_feed_back: async (payload) => {
        const { user_id } = payload;
        const query = `
            SELECT feed_back_id
            FROM trade_feed_back
            WHERE user_id = ${user_id} AND to_char(created_at, 'YYYY-MM-DD') = '${helper.time().today}';`;
        try {
            const res = await pool.query(query);
            return res.rows;
        } catch (err) {
            console.error(err.stack);
        };
    },
    limit_prediction: async (payload) => {
        const { user_id } = payload;
        const query = `
            SELECT id
            FROM market_prediction
            WHERE user_id = ${user_id} AND to_char(created_at, 'YYYY-MM-DD') = '${helper.time().today}';`;
        try {
            const res = await pool.query(query);
            return res.rows;
        } catch (err) {
            console.error(err.stack);
        };
    },
};