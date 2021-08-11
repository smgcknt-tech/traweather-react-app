//installed packages
import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import pm2 from "pm2";
import {api} from "./controllers/api.js"

// config
const app = express();
dotenv.config();
app.use(cors());

(async function(){
    const latest_stock_data = await api.upsert_latest_stock_data
    console.log("pm2 started cron.js")
    pm2.stop(0);
})();

//server connection
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
});
