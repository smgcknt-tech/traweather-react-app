// make sure to include file extention
import express from 'express';
import data from './data.js';
const app = express();
app.get("/", (req, res) => {
    res.send("server is ready");
});

app.get("/api/indicators",(req,res)=>{
    res.send(data.indicators)
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("serve at http://localhost:${port}")
});