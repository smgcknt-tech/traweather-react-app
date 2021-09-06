import express from "express"
import { api } from '../controllers/api.js';
export const api_router = express.Router()

api_router
    .get("/fetch_latest_stock", api.fetch_latest_stock)
    .get("/fetch_latest_stock/:code", api.fetch_one_latest_stock)
    .get("/fetch_plan", api.fetch_plan)
    .get("/fetch_todays_prediction/:date", api.fetch_todays_prediction)
api_router
    .post("/create_prediction", api.create_prediction)
    .post("/update_prediction/:date", api.update_prediction)
    .post("/plan", api.create_plan)
    .post("/update_plan/:code", api.update_plan)
    .post("/update_plan_reason/:code", api.update_plan_reason)
    .post("/update_plan_strategy/:code", api.update_plan_strategy)
    .post("/delete_plan", api.delete_plan)
