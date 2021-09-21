import dotenv from "dotenv";
let env={};
if (process.env.NODE_ENV === 'local'){
    dotenv.config();
    env = {
        port: process.env.PORT,
        kabu_plus_user: process.env.kabu_plus_user,
        kabu_plus_password: process.env.kabu_plus_password,
        jwt_secret_key: process.env.jwt_secret_key,
        db_user: process.env.db_user,
        db_password: process.env.db_password,
        db_host: process.env.db_host,
        db_port: process.env.db_port,
        db_name: process.env.db_name
    };
} else {
    env = {
        port: process.env.PORT,
        kabu_plus_user: process.env.kabu_plus_user,
        kabu_plus_password: process.env.kabu_plus_password,
        jwt_secret_key: process.env.jwt_secret_key,
        db_user: process.env.PGUSER,
        db_password: process.env.PGPASSWORD,
        db_host: process.env.PGHOST,
        db_port: process.env.PGPORT,
        db_name: process.env.PGDATABASE
    };
}
export {env}