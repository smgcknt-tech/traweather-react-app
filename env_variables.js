import dotenv from "dotenv";
dotenv.config();
export const env = {
    port: process.env.port,
    kabu_plus_user: process.env.kabu_plus_user,
    kabu_plus_password: process.env.kabu_plus_password,
    jwt_secret_key: process.env.jwt_secret_key
};