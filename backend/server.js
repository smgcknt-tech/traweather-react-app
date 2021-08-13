import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { api_router } from './routes/api.js';
import { api } from './controllers/api.js';
const app = express();
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// routes
app.get("/",async(req, res) => {res.send("server is ready")})
app.use("/api", api_router);


//server connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
    const env = app.get('env')
    console.log(`serve at http://localhost:${port}. envrionment:${env}`)
});
