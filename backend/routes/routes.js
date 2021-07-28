import express from "express"
import {api} from '../controllers/api.js';
export const router = express.Router()

router.get("/indicators", api.indicators);
