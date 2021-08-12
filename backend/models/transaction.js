import format from 'pg-format';
export const sql = {
    upsert: (values) => {
        return format(`
                BEGIN;
                INSERT INTO latest_stock_data(code,stockname,market,industry,stockdate,price,change,changeinpercent,previousclosepx,opening,high,low,vwap,volume,volumeinpercent,lowerrange,upperrange)
                VALUES %L
                ON CONFLICT(code)
                DO UPDATE SET
                    code=EXCLUDED.code,
                    stockname=EXCLUDED.stockname,
                    market=EXCLUDED.market,
                    industry=EXCLUDED.industry,
                    stockdate=EXCLUDED.stockdate,
                    price=EXCLUDED.price,
                    change=EXCLUDED.change,
                    changeinpercent=EXCLUDED.changeinpercent,
                    previousclosepx=EXCLUDED.previousclosepx,
                    opening=EXCLUDED.opening,
                    high=EXCLUDED.high,
                    low=EXCLUDED.low,
                    vwap=EXCLUDED.vwap,
                    volume=EXCLUDED.volume,
                    volumeinpercent=EXCLUDED.volumeinpercent,
                    lowerrange=EXCLUDED.lowerrange,
                    upperrange=EXCLUDED.upperrange;
                COMMIT;
                `,values);
    }
};