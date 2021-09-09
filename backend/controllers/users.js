import { user } from "../models/user.js";

export const users = {
    register: async (req, res) => {
        await user.register(req.body)
            .then((data) => {
                res.json(data)
            }).catch((err) => {
                console.error(err.message)
            })
    },
    login: async (req, res) => {
        await user.login(req.body)
            .then((data) => {
                if (!data.error) {
                    res.json(data)
                } else {
                    res.json({ error: data.error })
                }
            })
    },
    auth: (req, res) => {
        res.json(req.user);
    }
}