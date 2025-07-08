import { config } from 'dotenv';

config( {
    path: `.env.${process.env.NODE_ENV || 'development'}.local`,
})

export const {PORT,
    NODE_ENV,
    DB_URI,
    JWT_EXPIRES_IN,
    JWT_SECRET,
    ARCJET_ENV,
    ARCJECT_KEY,
    QPSTASH_URL,
    QSTASH_CURRENT_SIGNING_KEY,
    QSTASH_NEXT_SIGNING_KEY,
    QSTASH_TOKEN
} = process.env;
