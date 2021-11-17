import { helper } from '../utils/helper.js';
import { pool } from '../configs/postgresql.js';

export const api_get_model = {
  get_prediction: async (payload) => {
    const { user_id, date } = payload;
    const query1 = `
            SELECT *
            FROM market_prediction
            WHERE user_id =${user_id}
            AND to_char( created_at, 'YYYY-MM-DD' ) = '${date}';`;
    try {
      const res = await pool.query(query1);
      return res.rows[0];
    } catch (err) {
      console.error(err.stack);
    }
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
    }
  },
  get_market_heatmap: async () => {
    const query1 = `
            SELECT market,
                CASE WHEN cast(price as numeric) < 3000 THEN '小型'
                        WHEN cast(price as numeric) BETWEEN 3000 AND 4999 THEN '中型'
                        WHEN cast(price as numeric) > 5000 THEN '大型'
                END AS range,
                ROUND(AVG(cast(change_in_percent as numeric)),2) AS avg
            FROM latest_stock_data
            WHERE price <> '-'
                AND NOT market LIKE '%市場%'
                AND NOT market LIKE '%名証%'
                AND NOT market LIKE '%福証%'
                AND NOT market LIKE '%札証%'
            GROUP BY range, market
            ORDER BY market DESC;`;
    try {
      const res = await pool.query(query1);
      return res.rows;
    } catch (err) {
      console.error(err.stack);
    }
  },
  get_results: async (payload) => {
    const { user_id } = payload;
    const query1 = `
            SELECT *
            FROM trade_plan AS t1
            JOIN trade_result AS t2 ON t1.result_id = t2.result_id
            AND t1.user_id = ${user_id}
            AND to_char( t1.created_at, 'YYYY-MM-DD' ) = '${helper.time().today}'
            ORDER BY t2.lot;`;
    const query2 = `
            SELECT to_char(created_at, 'YYYY-MM') AS month,
            SUM(total_profit_loss)
            FROM trade_result
            WHERE user_id = ${user_id}
            AND to_char(created_at, 'YYYY-MM') = '${helper.time().thisMonth}'
            GROUP BY month;`;
    const query3 = `
            SELECT user_id,
            SUM(total_profit_loss)
            FROM trade_result
            WHERE user_id = ${user_id}
            AND to_char( created_at, 'YYYY-MM-DD' ) = '${helper.time().yesterday}'
            GROUP BY user_id;`;
    const query4 = `
            SELECT date_trunc('week', created_at::date) AS week,
            SUM(total_profit_loss)
            FROM trade_result
            WHERE user_id = ${user_id}
            GROUP BY week
            HAVING date_trunc('week', created_at::date)::text LIKE '${helper.time().thisMonday}%';`;
    const query5 = `
            SELECT COUNT(*)
            FROM trade_result
            WHERE user_id = ${user_id}
            AND profit_loss_rate > 0
            AND to_char(created_at, 'YYYY-MM') = '${helper.time().thisMonth}';`;
    const query6 = `
            SELECT COUNT(*)
            FROM trade_result
            WHERE user_id = ${user_id}
            AND profit_loss_rate < 0
            AND to_char(created_at, 'YYYY-MM') = '${helper.time().thisMonth}';`;
    try {
      const res1 = await pool.query(query1);
      const res2 = await pool.query(query2);
      const res3 = await pool.query(query3);
      const res4 = await pool.query(query4);
      const res5 = await pool.query(query5);
      const res6 = await pool.query(query6);
      const dataSets = {
        resultData: res1.rows,
        monthly_profit: res2.rows.length ? res2.rows[0].sum : 0,
        last_profit: res3.rows.length ? res3.rows[0].sum : 0,
        weekly_profit: res4.rows.length ? res4.rows[0].sum : 0,
        win_lose: {
          monthly_win: res5.rows.length ? res5.rows[0].count : 0,
          monthly_lose: res6.rows.length ? res6.rows[0].count : 0,
        },
      };
      return dataSets;
    } catch (err) {
      console.error(err.stack);
    }
  },
  get_daily_result: async (payload) => {
    const { date, user_id } = payload;
    const query = `
            SELECT *
            FROM trade_plan AS t1
            JOIN trade_result AS t2 ON t1.result_id = t2.result_id
            AND to_char( t1.created_at, 'YYYY-MM-DD' ) = '${date}'
            AND t1.user_id = '${user_id}';`;
    try {
      const res = await pool.query(query);
      return res.rows;
    } catch (err) {
      console.error(err.stack);
    }
  },
  get_trade_history: async (payload) => {
    const { code, user_id } = payload;
    const query = `
            SELECT *
            FROM trade_plan AS t1
            JOIN trade_result AS t2 ON t1.result_id = t2.result_id
            AND t1.code = '${code}'
            AND t1.user_id = '${user_id}';`;
    try {
      const res = await pool.query(query);
      return res.rows;
    } catch (err) {
      console.error(err.stack);
    }
  },
  get_plan: async (payload) => {
    const { user_id } = payload;
    const query = `
    SELECT * FROM trade_plan
    WHERE user_id = ${user_id}
    AND to_char(created_at, 'YYYY-MM-DD') = '${helper.time().today}'
    ORDER BY code ASC;`;
    try {
      const res = await pool.query(query);
      return res.rows;
    } catch (err) {
      console.error(err.stack);
    }
  },
  get_feedback_list: async (payload) => {
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
    }
  },
  limit_feed_back: async (payload) => {
    const { user_id } = payload;
    const query = `
      SELECT feed_back_id
      FROM trade_feed_back
      WHERE user_id = ${user_id}
      AND to_char(created_at, 'YYYY-MM-DD') = '${helper.time().today}';`;
    try {
      const res = await pool.query(query);
      return res.rows;
    } catch (err) {
      console.error(err.stack);
    }
  },
  limit_prediction: async (payload) => {
    const { user_id } = payload;
    const query = `
      SELECT id
      FROM market_prediction
      WHERE user_id = ${user_id}
      AND to_char(created_at, 'YYYY-MM-DD') = '${helper.time().today}';`;
    try {
      const res = await pool.query(query);
      return res.rows;
    } catch (err) {
      console.error(err.stack);
    }
  },
  get_favorite_trade_list: async (payload) => {
    const { user_id } = payload;
    const query = `
      SELECT t1.code, t1.market,t1.stock_name,t3.industry,
        COUNT(t2.result_id) AS try,
        COUNT(t2.profit_loss > 0 OR NULL) AS win,
        COUNT(t2.profit_loss < 0 OR NULL) AS lose,
        SUM(t2.profit_loss) AS pl,
        ROUND (AVG(t2.profit_loss),0) AS avg_pl,
        ROUND (AVG(t2.profit_loss_rate::integer),1) AS avg_plr,
        MAX(t2.profit_loss) AS max,
        MIN(t2.profit_loss) AS min
      FROM trade_plan AS t1
      JOIN trade_result AS t2
        ON t1.result_id = t2.result_id
      RIGHT JOIN latest_stock_data AS t3
        ON t1.code = t3.code::integer
      WHERE t1.user_id = ${user_id}
      GROUP BY t1.code,t1.market,t1.stock_name,t3.industry
      ORDER BY pl DESC;`;
    try {
      const res = await pool.query(query);
      return res.rows;
    } catch (err) {
      console.error(err.stack);
    }
  },
};
