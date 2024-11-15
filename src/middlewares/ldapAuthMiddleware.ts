import { NextFunction, Request, Response } from 'express';
import isEmail from 'validator/lib/isEmail';
import passport from 'passport';

import env from '../utils/envalid';
import createLdapStrategy from '../utils/createLdapStrategy';
import { ldapUser } from '../types';
import logger from '../utils/logger';
import ErrorMessageList from '../utils/errorMessageList';

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

      return res
        .status(500)
        .json({ message: ErrorMessageList.somethingWentWrong });
    }

    if (!user) {
      logger.error({ status, info });

      return res.status(401).json({ message: ErrorMessageList.invalidCredentials });
    }

    const ldapUser: ldapUser = {
      name: user.cn,
    };

    req.user = ldapUser;

    next();
  })(req, res, next);
};

export default ldapAuth;
