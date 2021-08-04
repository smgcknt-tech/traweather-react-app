// npm install
import express from 'express';
import dotenv from "dotenv";
// module files * make sure to include file extention
import { api_router } from './routes/api.js';
// template setting
dotenv.config();
const app = express();
// routes
app.get("/", (req, res) => { res.send("server is ready") });
app.use("/api", api_router)


//connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
});
