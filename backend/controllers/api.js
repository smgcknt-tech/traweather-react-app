import dotenv from "dotenv";
import fs from 'fs';
import iconv from 'iconv-lite';
import papa from "papaparse";
import request from "request";
import fastcsv from 'fast-csv';
import { pool } from "../models/config/db_connection.js";
import { sql } from "../models/sql.js"
dotenv.config();
let user = process.env.kabu_plus_user;
let password = process.env.kabu_plus_password;
let auth = `${user}:${password}@`

export const api = {
    fetch_latest_stock_data:(req,res)=>{
        pool.query(`SELECT code, stockname FROM latest_stock_data WHERE code NOT IN ( '0001', '0002' ) ORDER BY code ASC;`)
            .catch((err) => {
                console.error(err.message);
            })
            .then((results) => {
                res.json(results.rows);
            })
    },
    upsert_latest_stock_data:(req, res) => {
        const url = `https://${auth}csvex.com/kabu.plus/csv/japan-all-stock-prices/daily/japan-all-stock-prices.csv`;
        const file_path = "/Users/smgc-knt/Public/daily_japan-all_stock_prices.csv"
        let data = [];
        const parseStream = papa.parse(papa.NODE_STREAM_INPUT, {
            columns: true,
        });
        const dataStream = request
            .get(url)
            .pipe(iconv.decodeStream('Shift_JIS'))
            .pipe(parseStream)
        parseStream.on("data", record => {
            data.push(record);
        });
        dataStream.on("finish", () => {
            const ws = fs.createWriteStream(file_path);
            fastcsv
                .write(data, { headers: true })
                .pipe(ws);
            pool.query(sql.csv_upsert(data),[])
            .catch((err)=>{
                console.error(err.message);
            })
            .then(() => {
                    res.send(`csv of ${data.length} rows has been upserted into latest_stock_data table`);
            })
        });
    }
};