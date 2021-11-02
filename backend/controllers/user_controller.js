import { user_model } from "../models/user_model.js";

export const user_controller = {
    register: async (req, res) => {
        user_model.register(req.body).
            then((result) => {
                if (result === "SUCCESS") {
                    user_controller.login(req, res);
                } else {
                    res.json({ error: "新規登録に失敗しました。" });
                };
            });
    },
    login: async (req, res) => {
        await user_model.login(req.body)
            .then((data) => {
                if (!data.error) {
                    res.json(data);
                } else {
                    res.json({ error: data.error });
                };
            });
    },
    auth: (req, res) => {
        res.json(req.user);
    },
};