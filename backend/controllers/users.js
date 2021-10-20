import { user } from "../models/user.js";

export const users = {
    register: async (req, res) => {
        user.register(req.body).
            then((result) => {
                if (result === "SUCCESS") {
                    users.login(req, res)
                } else {
                    res.json({ error: "新規登録に失敗しました。" })
                }
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