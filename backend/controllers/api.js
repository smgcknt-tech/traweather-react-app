import { sql } from "../models/sql.js";
import { env } from "../../env_variables.js";
import { helper } from "../utils/helper.js";
/* const kabu_plus_auth = `${env.kabu_plus_user}:${env.kabu_plus_password}@`
const kabu_plus_url = `https://${kabu_plus_auth}csvex.com/kabu.plus` */

export const api = {
    fetch_latest_stock: (req, res) => {
        sql.get_latest_stock()
            .then((data) => {
                res.json(data)
            }).catch((err) => {
                console.error(err.message)
            })
    },
    fetch_one_latest_stock: (req, res) => {
        const code = req.params.code;
        sql.get_one_latest_stock(code)
            .then((data) => {
                res.send(data[0])
            }).catch((err) => {
                console.log(err.message)
            })
    },
    /*     upsert_latest_stock_table: async () => {
            try {
                const url = `${kabu_plus_url}/csv/japan-all-stock-prices-2/daily/japan-all-stock-prices-2.csv`;
                await helper.csv_stream(url, sql.upsert_latest_stock)
                    .then((res) => { console.log(res) })
                    .catch((err) => {
                        console.log(err.message)
                    })
                return `${helper.now()}: "upsert_latest_stock_table" is requested`
            } catch (err) {
                throw new Error(`${helper.now()}: upsert_latest_stock_table failed`)
            }
        }, */
    create_plan: async (req, res) => {
        try {
            const data = req.body;
            const results = await sql.create_plan(data)
            res.json(results)
        } catch (err) {
            console.error(err.message)
        }
    },
    fetch_plan: (req, res) => {
        sql.get_plan()
            .then((data) => {
                res.json(data)
            }).catch((err) => {
                console.error(err.message)
            })

    },
    update_plan: (req, res) => {
        const code = req.params.code
        const payload = req.body;
        sql.update_plan(payload,code)
            .then((data) => {
                res.json(data)
            }).catch((err) => {
                console.error(err.message)
            })

    }
}
