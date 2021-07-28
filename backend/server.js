// npm install
import express from 'express';
import dotenv from "dotenv";
// module files * make sure to include file extention
import {router} from './routes/routes.js';
// template setting
dotenv.config();
const app = express();
// routes
app.use("/api",router)

//connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("serve at http://localhost:${port}")
});
