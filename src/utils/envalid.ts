import dotenv from 'dotenv';
import { bool, cleanEnv, email, num, port, str, url } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'production', 'test'],
    default: 'production',
  }),
  PORT: port({ default: 3000 }),
  DEV_PORT: port(),
  TRUST_PROXY_LEVEL: num({ default: 0 }),
  LOGIN_PATH: str({ default: '/login' }),
  VERIFY_PATH: str({ default: '/verify' }),
  LOGOUT_PATH: str({ default: '/logout' }),
  LDAP_URL: url({ default: 'ldap://localhost:389' }),
  LDAP_BIND_DN: str(),
  LDAP_BIND_CREDENTIAL: str(),
  LDAP_SEARCH_BASE: str(),
  LDAP_SEARCH_FILTER_EMAIL: str(),
  LDAP_SEARCH_FILTER_UID: str(),
  JWT_SECRET: str(),
  JWT_EXPIRES_IN: str({ default: '1d' }),
  JWT_COOKIE_NAME: str({ default: 'jwt' }),
  MIN_USERNAME_LENGTH: num({ default: 3 }),
  MAX_USERNAME_LENGTH: num({ default: 50 }),
  MIN_PASSWORD_LENGTH: num({ default: 8 }),
  CORS_ALLOWED_ORIGIN: str({ default: '*' }),
  COOKIE_MAX_AGE: num({ default: 86400 }),
  COOKIE_HTTP_ONLY: bool({ default: true }),
  COOKIE_SECURE: bool({ default: false }),
  COOKIE_PATH: str({ default: '/' }),
  COOKIE_SAME_SITE: str({
    default: 'none',
    choices: ['lax', 'strict', 'none'],
  }),
  RATE_LIMIT: num({ default: 100 }),
  RATE_LIMIT_WINDOW_MS: num({ default: 6e5 }),
  WRITE_LOGS: bool({ default: true }),
  LOGS_TO_CONSOLE: bool({ default: true }),
  TEST_PORT: port({ default: 4000 }),
  TEST_LDAP_UID: str({ default: 'user' }),
  TEST_LDAP_EMAIL: email({ default: 'user@example.com' }),
  TEST_LDAP_PASSWORD: str({ default: 'password' }),
});

export default env;
