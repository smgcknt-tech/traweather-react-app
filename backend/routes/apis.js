import express from "express"
import { apis } from '../controllers/apis.js';
import { api } from "../models/api.js";
export const api_router = express.Router()

//GET request
api_router
    .get('/', (req, res) => { res.send("server is ready") })
    .get("/latest_stock", (req, res) => {
        apis.template2(req, res, api.get_latest_stock)
    })
    .get("/one_latest_stock", (req, res) => {
        apis.template3(req, res, api.get_one_latest_stock)
    })
    .get("/plan", (req, res) => {
        apis.template3(req, res, api.get_plan)
    })
    .get("/prediction", (req, res) => {
        apis.template3(req, res, api.get_prediction)
    })
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
    .post("/plan/update_numbers", (req, res) => {
        apis.template(req, res, api.update_plan_numbers)
    })
    .post("/plan/update_reason", (req, res) => {
        apis.template(req, res, api.update_plan_reason)
    })
    .post("/plan/update_strategy", (req, res) => {
        apis.template(req, res, api.update_plan_strategy)
    })
    .post("/plan/delete", (req, res) => {
        apis.template(req, res, api.delete_plan)
    })
    .post("/result/update_numbers", (req, res) => {
        apis.template(req, res, api.update_result_numbers)
    })
    .post("/result/update_comment", (req, res) => {
        apis.template(req, res, api.update_result_comment)
    })
    .post("/reflection/create", (req, res) => {
        apis.template(req, res, api.create_feed_back)
    })
