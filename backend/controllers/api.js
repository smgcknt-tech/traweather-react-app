import dotenv from "dotenv";
import fs from 'fs';
import iconv from 'iconv-lite';
import papa from "papaparse";
import request from "request";
import fastcsv from 'fast-csv';
import { pool } from "../../postgresql.js";
import { sql } from "../models/transaction.js";
dotenv.config();

let user = process.env.kabu_plus_user;
let password = process.env.kabu_plus_password;
let auth = `${user}:${password}@`

export const api = {
    fetch_latest_stock_data: (req, res) => {
        pool.query(`SELECT code, stockname FROM latest_stock_data WHERE code NOT IN ( '0001', '0002' ) ORDER BY code ASC;`)
            .catch((err) => {
                console.error(err.message);
            })
            .then((results) => {
                res.json(results.rows);
            })
    },
    upsert_latest_stock_data: async () => {
        const url = `https://${auth}csvex.com/kabu.plus/csv/japan-all-stock-prices/daily/japan-all-stock-prices.csv`;
        const file_path = "/Users/smgc-knt/Public/daily_japan-all_stock_prices.csv"
        let data = [];
        try {
            const parseStream = await papa.parse(papa.NODE_STREAM_INPUT, {
                columns: true,
            });
            const dataStream = await request
                .get(url)
                .pipe(iconv.decodeStream('Shift_JIS'))
                .pipe(parseStream);
            parseStream.on("data", record => {
                data.push(record);
            });
            dataStream.on("finish", () => {
                pool.query(sql.upsert(data), [], (err, results) => {
                    if (err) {
                        console.error(err.message)
                    } else {
                        const date = Date()
                        console.log(`${date}:${data.length} of data upserted into latest_stock_data table`);
                    }
                })
            });
        } catch (err) {
            console.error(err.message);
        }
    }
}