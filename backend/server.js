import express from 'express';
import { env } from './configs/env_variables.js';
import { api_router } from './routes/apis.js';
import { user_router } from './routes/users.js';
import cors from "cors";
import cookieParser from 'cookie-parser';
const app = express();
// middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// routes
app.use("/api", api_router);
app.use("/user", user_router);
//server
app.listen(env.port || 5000, () => {
    console.log(`server(PORT:${env.port}) is ready. ENVIRONMENT:${app.get('env')}`)
});
