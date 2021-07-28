import { index } from '../models/index_api.js';

export const api = {
    indicators: async (req, res) => {
        const dow = await index.dow()
        const nasdaq = await index.nasdaq()
        const nikkei = await index.nikkei()
        const indicators = [
            {
                name: "日経",
                price: `¥${nikkei}`
            },
            {
                name: "ダウ",
                price: `$${dow}`
            },
            {
                name: "ナスダック",
                price: `$${nasdaq}`
            }
        ]
        res.send(indicators)
    }
}