//installed packages
import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
// module files * make sure to include file extention
import { api_router } from './routes/api.js';
// config
const app = express();
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// routes
app.get("/", (req, res) => { res.send("server is ready") });
app.use("/api", api_router)
//database connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
});
