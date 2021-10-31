import express from "express"
import { api_controller } from '../controllers/api_controller.js';
import { api_model } from "../models/api_model.js";
export const api_router = express.Router()

//GET request
api_router
    .get('/', (req, res) => { res.send("server is ready") })
    .get("/latest_stock", (req, res) => {
        api_controller.template2(req, res, api_model.get_latest_stock)
    })
    .get("/one_latest_stock", (req, res) => {
        api_controller.template3(req, res, api_model.get_one_latest_stock)
    })
    .get("/plan", (req, res) => {
        api_controller.template3(req, res, api_model.get_plan)
    })
    .get("/prediction", (req, res) => {
        api_controller.template3(req, res, api_model.get_prediction)
    })
    .get("/one_result", (req, res) => {
        api_controller.template3(req, res, api_model.get_one_result)
    })
    .get("/feed_back", (req, res) => {
        api_controller.template3(req, res, api_model.get_feed_back)
    })
    .get("/results", (req, res) => {
        api_controller.results(req, res, api_model.get_results)
    })

//POST request
api_router
    .post("/prediction/create", (req, res) => {
        api_controller.template(req, res, api_model.create_prediction)
    })
    .post("/prediction/update", (req, res) => {
        api_controller.template(req, res, api_model.update_prediction)
    })
    .post("/plan/create", (req, res) => {
        api_controller.template(req, res, api_model.create_plan)
    })
    .post("/plan/update_numbers", (req, res) => {
        api_controller.template(req, res, api_model.update_plan_numbers)
    })
    .post("/plan/update_reason", (req, res) => {
        api_controller.template(req, res, api_model.update_plan_reason)
    })
    .post("/plan/update_strategy", (req, res) => {
        api_controller.template(req, res, api_model.update_plan_strategy)
    })
    .post("/plan/delete", (req, res) => {
        api_controller.template(req, res, api_model.delete_plan)
    })
    .post("/result/update_numbers", (req, res) => {
        api_controller.template(req, res, api_model.update_result_numbers)
    })
    .post("/result/update_comment", (req, res) => {
        api_controller.template(req, res, api_model.update_result_comment)
    })
    .post("/reflection/create", (req, res) => {
        api_controller.template(req, res, api_model.create_feed_back)
    })
