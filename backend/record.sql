-- file to keep record of change on DB

-- 20211102 manually migrated into the production DB.
ALTER TABLE trade_plan ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE trade_result ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE trade_feed_back ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE market_prediction ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;

-- 20211103 manually migrated into the production DB.
ALTER TABLE trade_feed_back ALTER COLUMN image_url DROP NOT NULL;

-- 20211104 manually migrated into the production DB.
ALTER TABLE trade_feed_back ALTER COLUMN image_url TYPE VARCHAR(500);