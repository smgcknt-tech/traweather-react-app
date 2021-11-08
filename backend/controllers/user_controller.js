import { user_model as um } from "../models/user_model.js";

export const user_controller = {
    register: async (req, res) => {
        um.register(req.body).
            then((result) => {
                if (result === "SUCCESS") {
                    user_controller.login(req, res);
                } else {
                    res.json({ error: "新規登録に失敗しました。" });
                };
            });
    },
    login: async (req, res) => {
        await um.login(req.body)
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