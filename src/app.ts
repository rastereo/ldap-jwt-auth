import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import passport from 'passport';
import LdapStrategy from 'passport-ldapauth';
import isEmail from 'validator/lib/isEmail';

import env from './config/envalid';

const app: Express = express();

app.use(express.json());

app.use(helmet());

passport.initialize();

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

app.post('/login', (req: Request, res: Response, _next: NextFunction) => {
  const { username } = req.body;

  console.log('validator', isEmail(username));

  const searchFilter = isEmail(username)
    ? env.LDAP_SEARCH_FILTER_EMAIL
    : env.LDAP_SEARCH_FILTER_NAME;

  passport.use(createLdapStrategy(searchFilter));

  passport.authenticate('ldapauth', { session: false }, (
    err: unknown,
    user?: { cn: string } | false | null,
    // info?: object | string | (string | undefined)[],
  ) => {
    if (err) {
      return res.status(500).json({ message: 'Something went wrong' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Access denied' });
    }

    return res.status(200).json({
      message: 'Access successful',
      user: user.cn,
    });
  })(req, res, _next);

});

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(404).send('Not found');
});

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(500).send('Something went wrong');
});

export default app;
