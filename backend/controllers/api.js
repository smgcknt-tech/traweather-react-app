import { index } from '../models/index_api.js';

export const api = {
    indicators: async (req, res) => {
        const dow = await index.dow()
        const nasdaq = await index.nasdaq()
        const nikkei = await index.nikkei()
        const indicators = [
            {
                id: "1",
                name: "日経",
                price: `¥${nikkei}`
            },
            {
                id: "2",
                name: "マザーズ(hc)",
                price: "1138円"
            },
            {
                id: "3",
                name: "ダウ",
                price: `$${dow}`
            },
            {
                id: "4",
                name: "ナスダック",
                price: `$${nasdaq}`
            }
        ]
        res.send(indicators)
    }
}