import format from 'pg-format';
import { helper } from '../utils/helper.js';
import { pool } from '../configs/postgresql.js';

export const api_post_model = {
  create_prediction: async (payload) => {
    const values = [payload['予想'], payload['戦略'], payload['注目セクター'], payload.user_id];
    const transaction = async () => {
      try {
        await pool.query('BEGIN');
        const res = await pool.query(
          `
                    INSERT INTO market_prediction (prediction,strategy,featured_sector,user_id)
                    SELECT $1, $2, $3, $4
                    WHERE NOT EXISTS (SELECT id FROM market_prediction WHERE to_char(created_at, 'YYYY-MM-DD') = '${
                      helper.time().today
                    }')
                    RETURNING *;`,
          values
        );
        await pool.query('COMMIT');
        if (res.rows.length > 0) return { data: res.rows[0] };
      } catch (err) {
        await pool.query('ROLLBACK');
        console.log(err.stack);
        return 'FAIL';
      }
    };
    const result = await transaction();
    if (result.data) return { createdData: result.data };
  },
  update_prediction: async (payload) => {
    const { user_id } = payload;
    const column = Object.keys(payload)[0];
    const values = [payload[column]];
    const transaction = async () => {
      try {
        await pool.query('BEGIN');
        const res = await pool.query(
          `
                    UPDATE market_prediction
                    SET ${column}=$1
                    WHERE user_id =${user_id} AND to_char(created_at, 'YYYY-MM-DD') = '${helper.time().today}'
                    RETURNING *;`,
          values
        );
        await pool.query('COMMIT');
        if (res.rows.length > 0) return { data: res.rows[0] };
      } catch (err) {
        await pool.query('ROLLBACK');
        console.log(err.stack);
        return 'FAIL';
      }
    };
    const result = await transaction();
    if (result.data) return { updatedData: result.data };
  },
  upsert_latest_stock: async (values) => {
    const query = format(
      `
                INSERT INTO latest_stock_data (code,stock_name,market,industry,stock_date,price,change,change_in_percent,previous_close,opening,high,low,vwap,volume,volume_in_percent,trading_value,market_cap,lower_range,upper_range,year_high_date,year_high,year_high_divergence_rate,year_low_date,year_low,year_low_divergence_rate)
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
                `,
      values
    );
    const transaction = async () => {
      try {
        await pool.query('BEGIN');
        const res = await pool.query(query, []);
        await pool.query('COMMIT');
        if (res.rows.length > 0) return { data: res.rows };
      } catch (err) {
        await pool.query('ROLLBACK');
        console.log(err.stack);
        return 'FAIL';
      }
    };
    const result = await transaction();
    if (result.data) return `${result.data.length} 銘柄のデータが更新されました。`;
  },
  update_result_numbers: async (payload) => {
    const { lot, entry_point, exit_point, result_id, user_id, date, profit_loss, profit_loss_rate, total_profit_loss } =
      payload;
    const values = [lot, entry_point, exit_point, profit_loss, profit_loss_rate.toFixed(1), total_profit_loss];
    const transaction = async () => {
      try {
        await pool.query('BEGIN');
        const res = await pool.query(
          `
                    UPDATE trade_result
                    SET lot=$1,entry_point=$2,exit_point=$3,profit_loss=$4, profit_loss_rate=$5,total_profit_loss=$6
                    WHERE user_id=${user_id} AND result_id=${result_id} AND to_char(created_at, 'YYYY-MM-DD') = '${date}'
                    RETURNING *;`,
          values
        );
        await pool.query('COMMIT');
        if (res.rows.length > 0) return 'SUCCESS';
      } catch (err) {
        await pool.query('ROLLBACK');
        console.log(err.stack);
        return 'FAIL';
      }
    };
    const result = await transaction();
    if (result === 'SUCCESS') {
      const query = `
                SELECT * FROM trade_plan
                JOIN trade_result ON trade_plan.result_id = trade_result.result_id
                WHERE trade_plan.user_id = ${user_id} AND to_char( trade_plan.created_at, 'YYYY-MM-DD') = '${
        helper.time().today
      }';`;
      return await pool.query(query);
    }
  },
  update_result_comment: async (payload) => {
    const { comment, result_id } = payload;
    const values = [comment];
    const transaction = async () => {
      try {
        await pool.query('BEGIN');
        await pool.query(
          `
                    UPDATE trade_result SET comment=$1
                    WHERE result_id=${result_id};`,
          values
        );
        await pool.query('COMMIT');
        return 'SUCCESS';
      } catch (err) {
        await pool.query('ROLLBACK');
        console.log(err.stack);
        return 'FAIL';
      }
    };
    const result = await transaction();
    if (result === 'SUCCESS') {
      const query = `
                SELECT *
                FROM trade_plan
                JOIN trade_result ON trade_plan.result_id = trade_result.result_id
                AND to_char( trade_plan.created_at, 'YYYY-MM-DD' ) = '${helper.time().today}';`;
      return await pool.query(query);
    }
    if (result === 'FAIL') return 'プランの更新に失敗しました。';
  },
  create_plan: async (payload) => {
    const { code, stock_name, market, opening, support, losscut, goal, reason, strategy, user_id } = payload;
    const transaction = async () => {
      try {
        await pool.query('BEGIN');
        const result = await pool.query(
          `
                    INSERT INTO trade_result (user_id)
                    VALUES($1) RETURNING result_id;`,
          [user_id]
        );
        await pool.query(
          `
                    INSERT INTO trade_plan (code,market,stock_name,opening,support,losscut,goal,reason,strategy,user_id,result_id)
                    VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,
          [
            code,
            market,
            stock_name,
            opening,
            support,
            losscut,
            goal,
            reason,
            strategy,
            user_id,
            result.rows[0].result_id,
          ]
        );
        const result2 = await pool.query(`
                    SELECT * FROM trade_plan
                    WHERE user_id = ${user_id} AND to_char(created_at, 'YYYY-MM-DD') = '${helper.time().today}'
                    ORDER BY code ASC;`);
        await pool.query('COMMIT');
        return { data: result2.rows };
      } catch (err) {
        await pool.query('ROLLBACK');
        console.log(err.stack);
        return 'FAIL';
      }
    };
    const result = await transaction();
    if (result.data) return result.data;
  },
  update_plan_numbers: async (payload) => {
    const { opening, support, losscut, goal, user_id, code } = payload;
    const values = [opening, support, losscut, goal];
    const transaction = async () => {
      try {
        await pool.query('BEGIN');
        await pool.query(
          `
                    UPDATE trade_plan
                    SET opening=$1,support=$2,losscut=$3,goal=$4
                    WHERE user_id=${user_id} AND code=${code};`,
          values
        );
        const result = await pool.query(`
                    SELECT * FROM trade_plan
                    WHERE user_id = ${user_id} AND to_char(created_at, 'YYYY-MM-DD') = '${helper.time().today}'
                    ORDER BY code ASC;`);
        await pool.query('COMMIT');
        return { data: result.rows };
      } catch (err) {
        await pool.query('ROLLBACK');
        console.log(err.stack);
        return 'FAIL';
      }
    };
    const result = await transaction();
    if (result.data) return result.data;
  },
  update_plan_reason: async (payload) => {
    const { reason, user_id, plan_id } = payload;
    const values = [reason];
    const transaction = async () => {
      try {
        await pool.query('BEGIN');
        await pool.query(
          `
                    UPDATE trade_plan
                    SET reason=$1
                    WHERE user_id=${user_id} AND plan_id=${plan_id};`,
          values
        );
        const result = await pool.query(`
                    SELECT * FROM trade_plan
                    WHERE user_id = ${user_id} AND to_char(created_at, 'YYYY-MM-DD') = '${helper.time().today}'
                    ORDER BY code ASC;`);
        await pool.query('COMMIT');
        return { data: result.rows };
      } catch (err) {
        await pool.query('ROLLBACK');
        console.log(err.stack);
        return 'FAIL';
      }
    };
    const result = await transaction();
    if (result.data) return result.data;
  },
  update_plan_strategy: async (payload) => {
    const { strategy, user_id, plan_id } = payload;
    const values = [strategy];
    const transaction = async () => {
      try {
        await pool.query('BEGIN');
        await pool.query(
          `
                    UPDATE trade_plan
                    SET strategy=$1
                    WHERE user_id=${user_id} AND plan_id=${plan_id};`,
          values
        );
        const result = await pool.query(`
                    SELECT * FROM trade_plan
                    WHERE user_id = ${user_id} AND to_char(created_at, 'YYYY-MM-DD') = '${helper.time().today}'
                    ORDER BY code ASC;`);
        await pool.query('COMMIT');
        return { data: result.rows };
      } catch (err) {
        await pool.query('ROLLBACK');
        console.log(err.stack);
        return 'FAIL';
      }
    };
    const result = await transaction();
    if (result.data) return result.data;
  },
  delete_plan: async (payload) => {
    const { user_id, code } = payload;
    const transaction = async () => {
      try {
        await pool.query('BEGIN');
        const res = await pool.query(`
                    SELECT plan_id, result_id
                    FROM trade_plan
                    WHERE user_id=${user_id} AND code=${code} AND to_char(created_at, 'YYYY-MM-DD') = '${
          helper.time().today
        }';`);
        await pool.query(`
                    DELETE FROM trade_plan
                    WHERE plan_id = ${res.rows[0].plan_id};`);
        await pool.query(`
                    DELETE FROM trade_result
                    WHERE result_id = ${res.rows[0].result_id};`);
        const result = await pool.query(`
                    SELECT * FROM trade_plan
                    WHERE user_id = ${user_id} AND to_char(created_at, 'YYYY-MM-DD') = '${helper.time().today}'
                    ORDER BY code ASC;`);
        await pool.query('COMMIT');
        return result.rows;
      } catch (err) {
        await pool.query('ROLLBACK');
        console.log(err.stack);
        return 'FAIL';
      }
    };
    const result = await transaction();
    return result;
  },
  create_feed_back: async (payload) => {
    const { title, content, image_url, user_id } = payload;
    const transaction = async () => {
      try {
        await pool.query('BEGIN');
        await pool.query(
          `
                    INSERT INTO trade_feed_back (title, content, image_url, user_id)
                    VALUES($1, $2, $3, $4)`,
          [title, content, image_url, user_id]
        );
        await pool.query('COMMIT');
        return 'SUCCESS';
      } catch (err) {
        console.log(err.stack);
        await pool.query('ROLLBACK');
        return 'FAIL';
      }
    };
    const result = await transaction();
    if (result === 'SUCCESS') return await pool.query('SELECT * FROM trade_feed_back;');
  },
};
