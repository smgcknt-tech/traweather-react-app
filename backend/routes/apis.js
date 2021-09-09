import express from "express"
import { apis } from '../controllers/apis.js';
import { validation_token } from '../JWT.js';
export const api_router = express.Router()

api_router
    .get("/fetch_latest_stock", apis.fetch_latest_stock)
    .get("/fetch_latest_stock/:code", apis.fetch_one_latest_stock)
    .get("/fetch_plan", apis.fetch_plan)
    .get("/fetch_todays_prediction/:date", apis.fetch_todays_prediction)
api_router
    .post("/create_prediction", apis.create_prediction)
    .post("/update_prediction/:date", apis.update_prediction)
    .post("/plan", apis.create_plan)
    .post("/update_plan/:code", apis.update_plan)
    .post("/update_plan_reason/:code", apis.update_plan_reason)
    .post("/update_plan_strategy/:code", apis.update_plan_strategy)
    .post("/delete_plan", apis.delete_plan)
