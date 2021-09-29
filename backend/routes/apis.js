import express from "express"
import { apis } from '../controllers/apis.js';
import { validation_token } from '../configs/JWT.js';
export const api_router = express.Router()

api_router
    .get("/fetch_latest_stock", apis.fetch_latest_stock)
    .get("/fetch_one_latest_stock", apis.fetch_one_latest_stock)
    .get("/fetch_plan", apis.fetch_plan)
    .get("/fetch_one_prediction", apis.fetch_one_prediction)
    .get("/fetch_result", apis.fetch_result)
api_router
    .post("/create_prediction", apis.create_prediction)
    .post("/update_prediction", apis.update_prediction)
    .post("/create_plan", apis.create_plan)
    .post("/update_plan_numbers", apis.update_plan_numbers)
    .post("/update_plan_reason", apis.update_plan_reason)
    .post("/update_plan_strategy", apis.update_plan_strategy)
    .post("/delete_plan", apis.delete_plan)
    .post("/update_result_numbers", apis.update_result_numbers)
    .post("/update_result_comment", apis.update_result_comment)
