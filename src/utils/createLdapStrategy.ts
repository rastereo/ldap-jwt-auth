import LdapStrategy from 'passport-ldapauth';

import env from './envalid';

function createLdapStrategy(searchFilter: string): LdapStrategy {
  return new LdapStrategy({
    server: {
      url: env.LDAP_URL,
      bindDN: env.LDAP_BIND_DN,
      bindCredentials: env.LDAP_BIND_CREDENTIAL,
      searchBase: env.LDAP_SEARCH_BASE,
      searchFilter,
    },
  });
}

export default createLdapStrategy;
