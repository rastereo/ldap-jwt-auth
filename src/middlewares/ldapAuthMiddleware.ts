import { NextFunction, Request, Response } from 'express';
import isEmail from 'validator/lib/isEmail';
import passport from 'passport';

import env from '../config/envalid';
import createLdapStrategy from '../components/createLdapStrategy';
import { ldapUser } from '../types';
import logger from '../config/logger';

const ldapAuth = (req: Request, res: Response, next: NextFunction): void => {
  const { username } = req.body;

  const searchFilter = isEmail(username)
    ? env.LDAP_SEARCH_FILTER_EMAIL
    : env.LDAP_SEARCH_FILTER_UID;

  const strategy = createLdapStrategy(searchFilter);

  passport.authenticate(strategy, { session: false }, (
    err: unknown,
    user?: { cn: string, mail: string } | false | null,
    info?: object | string,
    status?: number,
  ) => {

    if (err) {
      logger.error(err);

      return res.status(500).json({ message: 'Something went wrong' });
    }

    if (!user) {
      logger.error(info);

      return res.status(status ? status : 401).json(info);
    }

    const ldapUser: ldapUser = {
      name: user.cn,
    };

    req.user = ldapUser;

    next();
  })(req, res, next);
};

export default ldapAuth;
