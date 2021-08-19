/* import express from 'express';
import cron from "node-cron"
import { api } from "./controllers/api.js"
const app = express(); */

//pm2 is scheduled to restart at every 4pm when stock data will be updated by kabu+
//https://kabu.plus/document/membership.pdf

/* cron.schedule('* * 17 * * *', async () => {
    await Promise.all([
        api.upsert_latest_stock_table(),
    ]).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.error(err.message);
        console.log("failed in executing all api");
    })
});

app.listen(8000);
 */