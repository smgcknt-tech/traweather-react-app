import express from "express";
import { user_controller as uc } from '../controllers/user_controller.js';
import { validation_token } from '../configs/JWT.js';
export const user_router = express.Router();

user_router
    .get('/auth', validation_token, uc.auth)

user_router
    .post('/register', uc.register)
    .post('/login', uc.login)