import dotenv from "dotenv";
dotenv.config();
export const env = {
    kabu_plus_user: process.env.kabu_plus_user,
    kabu_plus_password: process.env.kabu_plus_password,
    jwt_secret_key: process.env.jwt_secret_key,
    db_user: process.env.db_user,
    db_password: process.env.db_password,
    db_host: process.env.db_host,
    db_port: process.env.db_port,
    db_name: process.env.db_name
};