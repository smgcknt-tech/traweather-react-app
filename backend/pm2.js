//installed packages
import express from 'express';
import { api } from "./controllers/api.js"
const app = express();

//pm2 is scheduled to restart at every 4pm when stock data will be updated
(async () => {
    try {
        const latest_stock_data = await api.upsert_latest_stock_data();
    } catch (err) {
        console.error(err.message);
    }
})();

const port = 8000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
});
