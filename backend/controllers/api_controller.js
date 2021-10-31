import { api_get_model } from "../models/api_get_model.js";
export const api_controller = {
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
    results: async (req, res) => {
        const monthly_profit = await api_get_model.get_monthly_profit(req.query.user_id)
        const last_profit = await api_get_model.get_last_profit(req.query.user_id)
        const todays_profit = await api_get_model.get_todays_profit(req.query.user_id)
        api_get_model.get_results(req.query)
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
}
