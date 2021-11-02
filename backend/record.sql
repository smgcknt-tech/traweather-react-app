-- file to keep record of change on DB

-- 20211102 Already implemented in the production environment.
ALTER TABLE trade_plan ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE trade_result ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE trade_feed_back ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE market_prediction ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;