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
    get_monthly_profit: (user_id) => {
        const query = `
        SELECT sum(total_profit_loss) FROM trade_result
        WHERE user_id = ${user_id} AND created_at::text like '${helper.time().today}%';`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows[0].sum
            }).catch((err) => {
                console.error(err.stack)
            })
        return data;
    },
    get_last_profit: (user_id) => {
        const query = `
        SELECT sum(total_profit_loss) FROM trade_result
        WHERE user_id = ${user_id} AND created_at::text like '${helper.time().yesterday}%';`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows[0].sum
            }).catch((err) => {
                console.error(err.stack)
            })
        return data;
    },
    get_todays_profit: (user_id) => {
        const query = `
        SELECT sum(total_profit_loss) FROM trade_result
        WHERE user_id = ${user_id} AND created_at::text like '${helper.time().today}%';`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows[0].sum
            }).catch((err) => {
                console.error(err.stack)
            })
        return data;
    },
    get_results: (payload) => {
        const { user_id } = payload
        const query = `
        SELECT * FROM trade_plan JOIN trade_result ON trade_plan.result_id = trade_result.result_id
        WHERE trade_plan.user_id = ${user_id} AND trade_plan.created_at::text like '${helper.time().today}%';`;
        const data = pool.query(query)
            .then((res) => {
                return res.rows
            }).catch((err) => {
                console.error(err.stack)
            })
        return data;
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