import express from "express"
import { api } from '../controllers/api.js';
export const api_router = express.Router()

api_router
    .get("/fetch_latest_stock", api.fetch_latest_stock)
    .get("/fetch_latest_stock/:code", api.fetch_one_latest_stock)
    .get("/fetch_plan", api.fetch_plan)
api_router
    .post("/plan", api.create_plan)
    .post("/update_plan/:code", api.update_plan)
