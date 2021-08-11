query_memo

CREATE DATABASE traweather;

CREATE TABLE latest_stock_data(
    code varchar(100),
    stockName varchar(100),
    market varchar(100),
    industry varchar(100),
    stockDate varchar(100),
    price varchar(100),
    change varchar(100),
    changeInPercent varchar(100),
    previousClosePx varchar(100),
    opening varchar(100),
    high varchar(100),
    low varchar(100),
    vwap varchar(100),
    volume varchar(100),
    volumeInPercent varchar(100),
    lowerRange varchar(100),
    upperRange varchar(100),
    unique(code)
);

COPY latest_stock_data FROM '${file_path}' WITH DELIMITER',' CSV HEADER;