import express from "express"
import { users } from '../controllers/users.js';
import { validation_token } from '../configs/JWT.js';
export const user_router = express.Router()

user_router
    .get('/auth', validation_token, users.auth)
user_router
    .post('/register', users.register)
    .post('/login', users.login)