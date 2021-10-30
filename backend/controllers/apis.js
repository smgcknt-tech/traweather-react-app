import { api } from "../models/api.js";
export const apis = {
    template: async (req, res, callback) => {
        await callback(req.body)
            .then((data) => {
                res.send(data)
            }).catch((err) => {
                res.send(err)
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
    fetch_result: async (req, res) => {
        const monthly_profit = await api.get_monthly_profit(req.query.user_id)
        const last_profit = await api.get_last_profit(req.query.user_id)
        const todays_profit = await api.get_todays_profit(req.query.user_id)
        api.get_result(req.query.user_id)
            .then((data) => {
                if (!data.error) {
                    res.json({
                        monthly_profit: monthly_profit,
                        last_profit: last_profit,
                        todays_profit: todays_profit,
                        resultData: data
                    })
                } else {
                    res.status(400).json({ error: data.error })
                }
            })
    },
    fetch_one_result: async (req, res) => {
        const { user_id, date } = req.query
        api.get_one_result(user_id, date)
            .then((data) => {
                if (!data.error) {
                    res.json(data)
                } else {
                    res.json({ error: data.error })
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
    },
    create_feed_back: async (req, res) => {
        const payload = req.body;
        api.create_feed_back(payload)
            .then((data) => {
                if (!data.error) {
                    res.json(data)
                } else {
                    res.json({ error: data.error })
                }
            })
    },
    fetch_feed_back: (req, res) => {
        api.get_feed_back(req.query.user_id)
            .then((data) => {
                if (!data.error) {
                    res.json(data)
                } else {
                    res.json({ error: data.error })
                }
            })
    },
}
