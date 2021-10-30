import express from "express"
import { apis } from '../controllers/apis.js';
import { api } from "../models/api.js";
export const api_router = express.Router()

//GET request
api_router
    .get('/', (req, res) => { res.send("server is ready") })
    .get("/fetch_latest_stock", apis.fetch_latest_stock)
    .get("/fetch_one_latest_stock", apis.fetch_one_latest_stock)
    .get("/fetch_plan", apis.fetch_plan)
    .get("/fetch_one_prediction", apis.fetch_one_prediction)
    .get("/fetch_result", apis.fetch_result)
    .get("/fetch_feed_back", apis.fetch_feed_back)
    .get("/fetch_one_result", apis.fetch_one_result)

//POST request
api_router
    .post("/prediction/create", (req, res) => {
        apis.template(req, res, api.create_prediction)
    })
    .post("/prediction/update", (req, res) => {
        apis.template(req, res, api.update_prediction)
    })
    .post("/plan/create", (req, res) => {
        apis.template(req, res, api.create_plan)
    })
    .post("/update_plan_numbers", apis.update_plan_numbers)
    .post("/update_plan_reason", apis.update_plan_reason)
    .post("/update_plan_strategy", apis.update_plan_strategy)
    .post("/delete_plan", apis.delete_plan)
    .post("/update_result_numbers", apis.update_result_numbers)
    .post("/update_result_comment", apis.update_result_comment)
    .post("/create_feed_back", apis.create_feed_back)
