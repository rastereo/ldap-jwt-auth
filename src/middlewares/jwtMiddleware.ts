import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import env from '../utils/envalid';
import ErrorMessageList from '../utils/errorMessageList';
import { accessLogger, logger } from '../utils/logger';
import { ldapUser } from '../types';

const jwtVerify = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies[env.JWT_COOKIE_NAME];

  if (!token) {
    res.status(400).json({ message: ErrorMessageList.missingToken });
  } else {
    try {
      const { name } = jwt.verify(token, env.JWT_SECRET) as ldapUser;

      accessLogger.info({ name, url: req.url, host: req.headers.host });

      req.user = name;

      next();
    } catch (err) {
      logger.error(err);

      res.status(401).json({ message: ErrorMessageList.invalidToken });
    }
  }
};

export default jwtVerify;
