import { sql } from "../models/sql.js";
import { env } from "../../env_variables.js";
import { helper } from "../utils/helper.js";

/* const kabu_plus_auth = `${env.kabu_plus_user}:${env.kabu_plus_password}@`
const kabu_plus_url = `https://${kabu_plus_auth}csvex.com/kabu.plus` */

export const api = {
    create_prediction: async(req, res) => {
        const data = req.body;
        await sql.create_prediction(data)
        sql.get_plan()
            .then((data) => {
                res.json(data)
            }).catch((err) => {
                console.error(err.message)
            })
    },
    update_prediction: async (req, res) => {
        const payload = req.body;
        const date = req.params.date;
        await sql.update_prediction(payload,date)
            .then((data) => {
                res.json(data)
            }).catch((err) => {
                console.error(err.message)
            })
    },
    fetch_todays_prediction: (req, res) => {
        const date = req.params.date
        sql.get_todays_prediction(date)
            .then((data) => {
                res.json(data)
            }).catch((err) => {
                console.error(err.message)
            })
    },
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
                res.send(data)
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
        const data = req.body;
        await sql.create_plan(data)
        sql.get_plan()
            .then((data) => {
                res.json(data)
            }).catch((err) => {
                console.error(err.message)
            })
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
        sql.update_plan(payload, code)
            .then((data) => {
                res.json(data)
            }).catch((err) => {
                console.error(err.message)
            })
    },
    update_plan_reason: (req, res) => {
        const code = req.params.code
        const payload = req.body;
        sql.update_plan_reason(payload, code)
            .then((data) => {
                res.json(data)
            }).catch((err) => {
                console.error(err.message)
            })
    },
    update_plan_strategy: (req, res) => {
        const code = req.params.code
        const payload = req.body;
        sql.update_plan_strategy(payload, code)
            .then((data) => {
                res.json(data)
            }).catch((err) => {
                console.error(err.message)
            })
    },
    delete_plan: (req, res) => {
        const code = req.body.code
        sql.delete_plan(code)
            .then((data) => {
                res.json(data)
            }).catch((err) => {
                console.error(err.message)
            })
    }
}
