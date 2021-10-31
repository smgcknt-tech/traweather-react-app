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
    template2: async (req, res, callback) => {
        await callback()
            .then((data) => {
                res.send(data)
            }).catch((err) => {
                res.send(err)
            })
    },
    template3: async (req, res, callback) => {
        await callback(req.query)
            .then((data) => {
                res.send(data)
            }).catch((err) => {
                res.send(err)
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
