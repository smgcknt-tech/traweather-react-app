import dotenv from "dotenv";
const PE = process.env;
let env = {};

if (PE.NODE_ENV === 'development') {
    dotenv.config();
    env = {
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
    };
}

if (PE.NODE_ENV === 'stage' || PE.NODE_ENV === 'production' ) {
    env = {
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
        imageUpload: '/api/uploads/s3'
    };
};

export { env };