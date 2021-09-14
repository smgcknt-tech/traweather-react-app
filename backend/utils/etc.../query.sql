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
    id SERIAL PRIMARY KEY ,
    prediction varchar(3000) NOT NULL,
    strategy varchar(3000) NOT NULL,
    featuredsector varchar(3000) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY ,
    username varchar(100) NOT NULL,
    password varchar(1000) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

/* add column */
ALTER TABLE plan ADD COLUMN user_id INT;
ALTER TABLE market_prediction ADD COLUMN user_id INT;
/* add NOT NULL */
ALTER TABLE plan ALTER COLUMN user_id SET NOT NULL;
/* delete PRIMARY KEY */
ALTER TABLE market_prediction DROP CONSTRAINT market_prediction_pkey;
/* add PRIMARY KEY */
ALTER TABLE plan ADD CONSTRAINT plan_pkey PRIMARY KEY(user_id,code);
ALTER TABLE market_prediction ADD CONSTRAINT market_prediction_pkey PRIMARY KEY(user_id,id,created_at);

/* rename table (cant change into reserved word)*/
ALTER TABLE users RENAME TO app_user;

ALTER TABLE market_prediction RENAME COLUMN featuredsector TO featured_sector;

/* show all table */
\dt
/* check table definition */
\d table name
\d+ table name

/* login */
psql -U smgcknt traweather;

/* reset search_path */
ALTER DATABASE traweather RESET search_path;

ALTER TABLE trade_plan RENAME stockname TO stock_name;
ALTER TABLE trade_plan ADD CONSTRAINT trade_plan_pkey PRIMARY KEY(user_id,id,created_at);

ALTER TABLE trade_plan ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE trade_plan ADD CONSTRAINT trade_plan_pkey PRIMARY KEY(code,user_id,created_at);
ALTER TABLE market_prediction DROP CONSTRAINT market_prediction_pkey;
ALTER TABLE trade_plan ADD COLUMN plan_id SERIAL;
ALTER TABLE trade_plan ALTER COLUMN strategy SET NOT NULL;



ALTER TABLE latest_stock_data RENAME COLUMN stockname TO stock_name;
ALTER TABLE latest_stock_data RENAME COLUMN stockdate TO stock_date;
ALTER TABLE latest_stock_data RENAME COLUMN changeinpercent TO change_in_percent;
ALTER TABLE latest_stock_data RENAME COLUMN previousclose TO previous_close;
ALTER TABLE latest_stock_data RENAME COLUMN volumeinpercent TO volume_in_percent;
ALTER TABLE latest_stock_data RENAME COLUMN tradingvalue TO trading_value;
ALTER TABLE latest_stock_data RENAME COLUMN marketcap TO market_cap ;
ALTER TABLE latest_stock_data RENAME COLUMN lowerrange TO lower_range;
ALTER TABLE latest_stock_data RENAME COLUMN upperrange TO upper_range;
ALTER TABLE latest_stock_data RENAME COLUMN yearhighdate TO year_high_date;
ALTER TABLE latest_stock_data RENAME COLUMN yearhigh TO year_high;
ALTER TABLE latest_stock_data RENAME COLUMN yearhighdivergencerate TO year_high_divergence_rate;
ALTER TABLE latest_stock_data RENAME COLUMN year_lowdate TO year_low_date;
ALTER TABLE latest_stock_data RENAME COLUMN year_low TO year_low;


ALTER TABLE latest_stock_data RENAME COLUMN year_lowdivergencerate TO year_low_divergence_rate;


CREATE TABLE trade_result (
    result_id SERIAL,
    user_id INT,
    profit_loss INT DEFAULT 0,
    profit_loss_rate INT DEFAULT 0,
    entry_point INT DEFAULT 0,
    exit_point INT DEFAULT 0,
    comment varchar(1000) DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    PRIMARY KEY (user_id, created_at)
);

    FOREIGN KEY(plan_id) REFERENCES trade_plan(plan_id)


ALTER TABLE trade_plan ADD COLUMN result_id INT;
ALTER TABLE trade_plan DROP CONSTRAINT trade_plan_pkey;
ALTER TABLE trade_plan ADD CONSTRAINT  trade_plan_pkey PRIMARY KEY(code, user_id, created_at,result_id);
ALTER TABLE trade_plan ADD CONSTRAINT fk_result_id FOREIGN KEY(result_id) REFERENCES trade_result(result_id);

ALTER TABLE trade_result DROP CONSTRAINT trade_result_pkey;
ALTER TABLE trade_result ADD CONSTRAINT  trade_result_pkey PRIMARY KEY(user_id, created_at,result_id);

/* If there are multiple primary or unique keys in the child table, all of them must be set in the foreign key of the parent table. */
ALTER TABLE trade_plan ADD FOREIGN KEY(user_id, created_at,result_id) REFERENCES trade_result(user_id, created_at,result_id);


/* change data type */
ALTER TABLE trade_result ALTER COLUMN profit_loss_rate TYPE real;

ALTER TABLE trade_result ADD COLUMN total_profit_loss INT DEFAULT 0;
ALTER TABLE trade_result ALTER COLUMN lot SET DEFAULT 0;

CREATE TABLE trade_feed_back (
    feed_back_id SERIAL,
    user_id INT,
    title varchar(100) NOT NULL,
    content varchar(1000) NOT NULL,
    image_url varchar(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_DATE,
    PRIMARY KEY (user_id, created_at)
);