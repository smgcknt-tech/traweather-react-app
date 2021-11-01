import express from 'express';
import { env } from './configs/config.js';
import { api_router } from './routes/api_router.js';
import { user_router } from './routes/user_router.js';
import { upload_router } from './routes/upload_router.js';
import {dataSets, downloadCsv, download_router } from './routes/download_router.js';
import path from 'path';
import cors from "cors";
import cron from "node-cron"
import cookieParser from 'cookie-parser';
import { api_post_model } from './models/api_post_model.js';
const app = express();
const __dirname = path.resolve();

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// routes
app.use('/api/uploads', upload_router);
app.use('/api/downloads', download_router);
app.use("/api/user", user_router);
app.use("/api", api_router);

//task-scheduler
cron.schedule('0 0 18 * * 1-5', async () => {
    try {
        await downloadCsv(dataSets)
    } catch (err) {
        console.log(err)
    }
}, {
    scheduled: true,
    timezone: "Asia/Tokyo"
});
//api_server
app.listen(env.API_PORT, () => {
    console.log(`API_SERVER PORT:${env.API_PORT} ENVIRONMENT='${app.get('env')}'`)
});
