import express from "express";
import { user_controller } from '../controllers/user_controller.js';
import { validation_token } from '../configs/JWT.js';
export const user_router = express.Router();

user_router
    .get('/auth', validation_token, user_controller.auth)

user_router
    .post('/register', user_controller.register)
    .post('/login', user_controller.login)