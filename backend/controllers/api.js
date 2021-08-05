import dotenv from "dotenv";
import fs from 'fs';
import iconv from 'iconv-lite';
import papa from "papaparse";
import request from "request";
import fastcsv from 'fast-csv';
dotenv.config();
let user = process.env.kabu_plus_user;
let password = process.env.kabu_plus_password;
let auth = `${user}:${password}@`

export const api = {
    indicators: async (req, res) => {
        let url = `https://${auth}csvex.com/kabu.plus/csv/japan-all-stock-prices/daily/japan-all-stock-prices.csv`;
        let data = [];
        const options = {
            columns: true,
        };
        const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options);
        const dataStream = request
            .get(url)
            .pipe(iconv.decodeStream('Shift_JIS'))
            .pipe(parseStream)
        parseStream.on("data", chunk => {
            data.push(chunk);
        });
        dataStream.on("finish", () => {
            const ws = fs.createWriteStream("./backend/models/csv/daily_japan-all_stock_prices.csv");
            fastcsv
                .write(data, { headers: true })
                .pipe(ws);
            res.send("fetched data")
        });
    }
};