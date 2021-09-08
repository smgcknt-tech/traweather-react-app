import express from "express"
import { user } from '../controllers/user.js';
import { validation_token } from '../JWT.js';
export const user_router = express.Router()


user_router
    .get('/auth', validation_token,user.auth)
user_router
    .post('/register', user.register)
    .post('/login', user.login)