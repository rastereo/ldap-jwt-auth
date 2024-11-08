import dotenv from 'dotenv';
import { cleanEnv, port, str, url } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  LDAP_URL: url(),
  LDAP_BIND_DN: str(),
  LDAP_BIND_CREDENTIAL: str(),
  LDAP_SEARCH_BASE: str(),
  LDAP_SEARCH_FILTER_EMAIL: str(),
  LDAP_SEARCH_FILTER_NAME: str(),
});

export default env;
