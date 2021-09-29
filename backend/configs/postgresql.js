import pg from 'pg';
import { env } from "./env_variables.js";

export const pool = new pg.Pool({
    user: env.db_user,
    password: env.db_password,
    host: env.db_host,
    port: env.db_port,
    database: env.db_name
})
