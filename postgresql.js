import dotenv from "dotenv";
dotenv.config();
import pg from 'pg';

export const pool = new pg.Pool({
    user: process.env.db_user,
    password: process.env.db_password,
    host: process.env.db_host,
    port: process.env.db_port,
    database: process.env.db_name
})
