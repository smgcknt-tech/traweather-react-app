import pg from 'pg';
import { env } from "./env_variables.js";

export const pool = new pg.Pool({
    user: env.PGUSER,
    password: env.PGPASSWORD,
    host: env.PGHOST,
    port: env.PGPORT,
    database: env.PGDATABASE
})
