import dotenv from "dotenv";
const PE = process.env;

const config = () => {
    if (process.env.NODE_ENV === 'test') {
        return {
            env: {

            }
        }
    } else if (process.env.NODE_ENV === 'local') {
        dotenv.config();
        return {
            env: {
                AWSAccessKeyId: "invalid",
                AWSSecretKey: "invalid",
                kabu_plus_user: "invalid",
                kabu_plus_password: "invalid",
                jwt_secret_key: PE.jwt_secret_key,
                API_PORT: PE.API_PORT,
                PGUSER: PE.PGUSER,
                PGPASSWORD: PE.PGPASSWORD,
                PGHOST: PE.PGHOST,
                PGPORT: PE.PGPORT,
                PGDATABASE: PE.PGDATABASE,
            }
        }
    } else if (PE.NODE_ENV === 'stage' || PE.NODE_ENV === 'production') {
        return {
            env: {
                AWSAccessKeyId: PE.AWSAccessKeyId,
                AWSSecretKey: PE.AWSSecretKey,
                kabu_plus_user: PE.kabu_plus_user,
                kabu_plus_password: PE.kabu_plus_password,
                jwt_secret_key: PE.jwt_secret_key,
                API_PORT: PE.API_PORT,
                PGUSER: PE.PGUSER,
                PGPASSWORD: PE.PGPASSWORD,
                PGHOST: PE.PGHOST,
                PGPORT: PE.PGPORT,
                PGDATABASE: PE.PGDATABASE,
            }
        }
    }
}

export const { env } = config()