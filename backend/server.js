import express from 'express';
import { api_router } from './routes/api.js';
import { env } from "../env_variables.js";
import cors from "cors";
const app = express();
// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// routes
app.use("/api", api_router);
//server
const port = env.port || 5000;
app.listen(port, () => {
    const env = app.get('env')
    console.log(`serve at http://localhost:${port}. envrionment_${env}`)
});
