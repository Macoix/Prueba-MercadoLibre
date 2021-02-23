import dotenv from 'dotenv-safe';

dotenv.config();

export const {
  NODE_ENV,
  SERVER_HOST,
  SERVER_PORT,
  LOG_LEVEL,
  MORGAN_FORMAT
} = process.env;