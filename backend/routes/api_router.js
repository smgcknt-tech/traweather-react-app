import express from "express"
import { api_controller as ac } from '../controllers/api_controller.js';
import { api_post_model as apm } from "../models/api_post_model.js";
import { api_get_model as agm } from "../models/api_get_model.js";
import { middle_ware as mw } from "./middle_ware.js";
export const api_router = express.Router();

api_router
    .get('/', (req, res) => { res.send("server is ready") })
    .get("/latest_stock", (req, res) => {
        ac.passNothing(req, res, agm.get_latest_stock);
    })
    .get("/market_heatmap", (req, res) => {
        ac.passNothing(req, res, agm.get_market_heatmap);
    })
    .get("/plan", (req, res) => {
        ac.passQuery(req, res, agm.get_plan);
    })
    .get("/prediction", (req, res) => {
        ac.passQuery(req, res, agm.get_prediction);
    })
    .get("/one_result", (req, res) => {
        ac.passQuery(req, res, agm.get_one_result);
    })
    .get("/feed_back", (req, res) => {
        ac.passQuery(req, res, agm.get_feed_back);
    })
    .get("/results", (req, res) => {
        ac.passQuery(req, res, agm.get_results);
    })

api_router
    .post("/prediction/create", mw.limit_prediction, (req, res) => {
        ac.passBody(req, res, apm.create_prediction);
    })
    .post("/prediction/update", (req, res) => {
        ac.passBody(req, res, apm.update_prediction);
    })
    .post("/plan/create", (req, res) => {
        ac.passBody(req, res, apm.create_plan);
    })
    .post("/plan/update_numbers", (req, res) => {
        ac.passBody(req, res, apm.update_plan_numbers);
    })
    .post("/plan/update_reason", (req, res) => {
        ac.passBody(req, res, apm.update_plan_reason);
    })
    .post("/plan/update_strategy", (req, res) => {
        ac.passBody(req, res, apm.update_plan_strategy);
    })
    .post("/plan/delete", (req, res) => {
        ac.passBody(req, res, apm.delete_plan);
    })
    .post("/result/update_numbers", (req, res) => {
        ac.passBody(req, res, apm.update_result_numbers);
    })
    .post("/result/update_comment", (req, res) => {
        ac.passBody(req, res, apm.update_result_comment);
    })
    .post("/reflection/create", mw.limit_feed_back, (req, res) => {
        ac.passBody(req, res, apm.create_feed_back);
    })
