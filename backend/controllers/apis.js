import { api } from "../models/api.js";
// import { env } from "../../env_variables.js";
// import { helper } from "../utils/helper.js";

// const kabu_plus_auth = `${env.kabu_plus_user}:${env.kabu_plus_password}@`
// const kabu_plus_url = `https://${kabu_plus_auth}csvex.com/kabu.plus`

export const apis = {
    create_prediction: async (req, res) => {
        const payload = req.body;
        await api.create_prediction(payload)
            .then((data) => {
                if (!data.error) {
                    res.json(data)
                } else {
                    res.status(400).json({ error: data.error })
                }
            })
    },
    update_prediction: async (req, res) => {
        const payload = req.body;
        await api.update_prediction(payload)
            .then((data) => {
                if (!data.error) {
                    res.json(data)
                } else {
                    res.status(400).json({ error: data.error })
                }
            })
    },
    fetch_one_prediction: (req, res) => {
        api.get_one_prediction(req.query)
            .then((data) => {
                res.json(data)
            }).catch((err) => {
                console.log(err.message)
            })
    },
    fetch_latest_stock: (req, res) => {
        api.get_latest_stock()
            .then((data) => {
                if (!data.error) {
                    res.json(data)
                } else {
                    res.status(400).json({ error: data.error })
                }
            })
    },
    fetch_one_latest_stock: (req, res) => {
        api.get_one_latest_stock(req.query.code)
            .then((data) => {
                if (!data.error) {
                    res.json(data)
                } else {
                    res.status(400).json({ error: data.error })
                }
            })
    },
    upsert_latest_stock_table: async () => {
        // const url = `${kabu_plus_url}/csv/japan-all-stock-prices-2/daily/japan-all-stock-prices-2.csv`;
        // const result = await helper.csv_stream(url, api.upsert_latest_stock)
        //     .then((res) => {
        //         if (!res.error) {
        //             return res
        //         } else {
        //             return res.error
        //         }
        //     })
        // return result;
    },
    fetch_result:async(req, res) => {
        const monthly_profit = await api.get_monthly_profit(req.query.user_id)
        const last_profit = await api.get_last_profit(req.query.user_id)
        const todays_profit = await api.get_todays_profit(req.query.user_id)
        api.get_result(req.query.user_id)
            .then((data) => {
                if (!data.error) {
                    res.json({
                        monthly_profit: monthly_profit,
                        last_profit: last_profit,
                        todays_profit:todays_profit,
                        resultData:data
                    })
                } else {
                    res.status(400).json({ error: data.error })
                }
            })
    },
    update_result_numbers: (req, res) => {
        const payload = req.body;
        api.update_result_numbers(payload)
            .then((data) => {
                if (!data.error) {
                    res.json(data)
                } else {
                    res.status(400).json({ error: data.error })
                }
            })
    },
    update_result_comment: (req, res) => {
        const payload = req.body;
        api.update_result_comment(payload)
            .then((data) => {
                if (!data.error) {
                    res.json(data)
                } else {
                    res.status(400).json({ error: data.error })
                }
            })
    },
    create_plan: async (req, res) => {
        const payload = req.body;
        api.create_plan(payload)
            .then((data) => {
                if (!data.error) {
                    res.json(data)
                } else {
                    res.status(400).json({ error: data.error })
                }
            })
    },
    fetch_plan: (req, res) => {
        api.get_plan(req.query.user_id)
            .then((data) => {
                if (!data.error) {
                    res.json(data)
                } else {
                    res.status(400).json({ error: data.error })
                }
            })
    },
    update_plan_numbers: (req, res) => {
        const payload = req.body;
        api.update_plan_numbers(payload)
            .then((data) => {
                if (!data.error) {
                    res.json(data)
                } else {
                    res.status(400).json({ error: data.error })
                }
            })
    },
    update_plan_reason: (req, res) => {
        const payload = req.body;
        api.update_plan_reason(payload)
            .then((data) => {
                if (!data.error) {
                    res.json(data)
                } else {
                    res.status(400).json({ error: data.error })
                }
            })
    },
    update_plan_strategy: (req, res) => {
        const payload = req.body;
        api.update_plan_strategy(payload)
            .then((data) => {
                if (!data.error) {
                    res.json(data)
                } else {
                    res.status(400).json({ error: data.error })
                }
            })
    },
    delete_plan: (req, res) => {
        const payload = req.body;
        api.delete_plan(payload)
            .then((data) => {
                if (!data.error) {
                    res.json(data)
                } else {
                    res.status(400).json({ error: data.error })
                }
            })
    }
}
