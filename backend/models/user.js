import format from 'pg-format';
import { pool } from '../configs/postgresql.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../configs/env_variables.js';
export const user = {
    register: async (payload) => {
        console.log("register")
        const { username, password } = payload;
        const result = await bcrypt.hash(password, 5).then(async (hash) => {
            try {
                await pool.query("BEGIN")
                await pool.query(`INSERT INTO app_user (username,password) VALUES($1, $2);`, [username, hash])
                await pool.query("COMMIT")
                return "SUCCESS"
            } catch (err) {
                await pool.query('ROLLBACK')
            }
        })
        return result;
    },
    login: async (payload) => {
        console.log("login")
        const { username, password } = payload;
        const user = await pool.query(`SELECT * FROM app_user WHERE username = '${username}'`).then(res => res.rows[0])
        if (!user) {
            return { error: "user doesn't exist" }
        } else {
            const result = await bcrypt.compare(password, user.password)
                .then((match) => {
                    if (!match) {
                        return { error: "wrong username and password" }
                    } else {
                        const access_token = jwt.sign({ username: username, id: user.id }, env.jwt_secret_key)
                        return access_token
                    }
                })
            return result
        }
    },
};