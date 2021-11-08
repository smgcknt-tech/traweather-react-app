import { api_get_model} from "../models/api_get_model.js"

export const middle_ware = {
    limit_feed_back: async (req, res, next) => {
        const result = await api_get_model.limit_feed_back(req.body);
        if (result.length < 1) {
            next();
        } else {
            res.json({ message: "一日複数回の振り返り投稿は出来ません。" });
        };
    },
    limit_prediction: async (req, res, next) => {
        const result = await api_get_model.limit_prediction(req.body);
        if (result.length < 1) {
            next();
        } else {
            res.json({ message: "一日複数回の市場予想の投稿は出来ません。" });
        };
    },

}