import express from 'express';
import cron from "node-cron"
import { api } from "./controllers/api.js"
const app = express();

//pm2 is scheduled to restart at every 4pm when stock data will be updated
//https://kabu.plus/document/membership.pdf
cron.schedule('0 0 17 * * *', async() => {
    try {
        const latest_stock_data = await api.upsert_latest_stock_data();
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(8000, () => {
    console.log(`serve at http://localhost:${port}`)
});
