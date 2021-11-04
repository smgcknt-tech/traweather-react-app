import { api_get_model} from "../models/api_get_model.js"
export const limit_check = async (req, res, next) => {
    const result = await api_get_model.postedFeedBack(req.body);
    if (result.length < 1) {
        next();
    } else {
        res.json({ message: "一日複数回の振り返り投稿は出来ません。" });
    };
};