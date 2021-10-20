import express from 'express';
import { env } from './configs/env_variables.js';
import { api_router } from './routes/apis.js';
import { user_router } from './routes/users.js';
import { upload_router } from './routes/uploads.js';
import path from 'path';
import cors from "cors";
import cookieParser from 'cookie-parser';
const app = express();
const __dirname = path.resolve();

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// routes
app.use("/api", api_router);
app.use('/api/uploads', upload_router);
app.use("/user", user_router);

//api_server
app.listen(env.API_PORT, () => {
    console.log(`api-server is working on port:${env.API_PORT}. ENVIRONMENT='${app.get('env')}'`)
});
