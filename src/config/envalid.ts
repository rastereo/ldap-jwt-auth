import dotenv from 'dotenv';
import { bool, cleanEnv, num, port, str, url } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  LDAP_URL: url({ default: 'ldap://localhost:389' }),
  LDAP_BIND_DN: str(),
  LDAP_BIND_CREDENTIAL: str(),
  LDAP_SEARCH_BASE: str(),
  LDAP_SEARCH_FILTER_EMAIL: str(),
  LDAP_SEARCH_FILTER_UID: str(),
  JWT_SECRET: str(),
  JWT_EXPIRES_IN: str({ default: '1d' }),
  JWT_COOKIE_NAME: str({ default: 'jwt' }),
  MIN_USERNAME_LENGTH: num({ default: 2 }),
  MIN_PASSWORD_LENGTH: num({ default: 8 }),
  CORS_ALLOWED_ORIGIN: str({ default: '*' }),
  COOKIE_MAX_AGE: num({ default: 86400 }),
  COOKIE_HTTP_ONLY: bool({ default: true }),
  COOKIE_SECURE: bool({ default: false }),
  RATE_LIMIT: num({ default: 100 }),
  RATE_LIMIT_WINDOW_MS: num({ default: 6e5 }),
  LOG_TO_CONSOLE: bool({ default: true }),
});

export default env;
