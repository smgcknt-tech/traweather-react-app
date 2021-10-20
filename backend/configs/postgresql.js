import pg from 'pg';
import { env } from "./config.js";

export const pool = new pg.Pool({
    user: env.PGUSER,
    password: env.PGPASSWORD,
    host: env.PGHOST,
    port: env.PGPORT,
    database: env.PGDATABASE
})
