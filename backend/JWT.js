
import jwt from 'jsonwebtoken';
import { env } from '../env_variables.js'

export const validation_token = (req, res, next) => {
    const access_token = req.headers['access_token']
    if (!access_token) {
        return res.status(400).json({ error: "ユーザー認証に失敗しました。もう一度ログインして下さい" })
    }
    try {
        const valid_token = jwt.verify(access_token, env.jwt_secret_key)
        req.user = valid_token
        if (valid_token) {
            return next()
        }
    } catch (err) {
        return res.status(400).json({ error: "ユーザー認証に失敗しました。もう一度ログインして下さい" })
    }

}
