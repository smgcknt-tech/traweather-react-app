/* file to take a note of query */


/* created datavbase for this app */
CREATE DATABASE traweather;

/* latest stock data from csv will be inserted into this table */
CREATE TABLE latest_stock_data(
    code varchar(100),
    stockName varchar(100),
    market varchar(100),
    industry varchar(100),
    stockDate varchar(100),
    price varchar(100),
    change varchar(100),
    changeInPercent varchar(100),
    previousClose varchar(100),
    opening varchar(100),
    high varchar(100),
    low varchar(100),
    vwap varchar(100),
    volume varchar(100),
    volumeInPercent varchar(100),
    tradingValue varchar(100),
    marketCap varchar(100),
    lowerRange varchar(100),
    upperRange varchar(100),
    yearHighDate varchar(100),
    yearHigh varchar(100),
    yearHighDivergenceRate varchar(100),
    yearLowDate varchar(100),
    yearLow varchar(100),
    yearLowDivergenceRate varchar(100),
    unique(code)
);

/*to insert all data from streamed csv data */
COPY latest_stock_data FROM '${file_path}' WITH DELIMITER',' CSV HEADER;

/* data from PlanEditPage */
CREATE TABLE plan (
    code varchar(100),
    market varchar(100),
    stockname varchar(100),
    opening int,
    support int,
    losscut int,
    goal int,
    reason varchar(3000),
    strategy varchar(3000)
);

INSERT INTO plan (code,market,stockname,opening,support,losscut,goal,reason,strategy) values($1, $2, $3, $4,$5, $6, $7, $8,$9)

ALTER TABLE plan
ALTER COLUMN code TYPE int USING code::integer;

/* command to delete record from table */
DELETE FROM plan;


CREATE TABLE market_prediction(
    /*user_id*/
    id
    prediction varchar(3000),
    strategy varchar(3000),
    featuredsector varchar(3000),
    created_at

);