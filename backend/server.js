import express from 'express';
import { env } from './configs/env_variables.js';
import { api_router } from './routes/apis.js';
import { user_router } from './routes/users.js';
import {uploadRouter} from './routes/upoloadRouter.js';
import path from 'path';
import cors from "cors";
import cookieParser from 'cookie-parser';
const app = express();
const __dirname = path.resolve();
console.log(path.join(__dirname, '/uploads'))
// middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// routes
app.use("/api", api_router);
app.use('/api/uploads', uploadRouter);
app.use("/user", user_router);
//server
app.listen(env.port || 5000, () => {
    console.log(`server(PORT:${env.port}) is ready. ENVIRONMENT:${app.get('env')}`)
});
