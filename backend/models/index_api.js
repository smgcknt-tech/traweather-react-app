import yahooStockPrices from 'yahoo-stock-prices';
export const index = {
    nikkei: async() => {
        const nikkei = await yahooStockPrices.getCurrentData('^N225')
        return nikkei.price
    },
    dow: async() => {
        const dow = await yahooStockPrices.getCurrentData('^DJI')
        return dow.price
    },
    nasdaq: async() => {
        const nasdaq = await yahooStockPrices.getCurrentData('^IXIC')
        return nasdaq.price
    }
};