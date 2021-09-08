import { sql } from "../models/sql.js";

export const user = {
    register: async (req, res) => {
        await sql.register_user(req.body)
            .then((data) => {
                res.json(data)
            }).catch((err) => {
                console.error(err.message)
            })
    },
    login: async (req, res) => {
        await sql.login_user(req.body)
            .then((data) => {
                if(!data.error){
                    // res.cookie("access_token",data,{
                    //     // cookie expires after 30days
                    //     maxAge:30*24*60*60*1000,
                    //     httpOnly : true
                    // })
                    res.json(data)
                } else {
                    res.json({error : data.error})
                }
            })
    },
    auth:(req,res)=>{
        res.json(req.user);
    }
}