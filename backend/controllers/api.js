import { index } from '../models/index.js';

export const api = {
    indicators: async (req, res) => {
        const dow = await index.dow()
        const nasdaq = await index.nasdaq()
        const nikkei = await index.nikkei()
        const indicators = [
            {
                name: "日経",
                price: `¥1000`
            },
            {
                name: "ダウ",
                price: `$200`
            },
            {
                name: "ナスダック",
                price: `$1000`
            }
        ]
        res.send(indicators)
    }
};