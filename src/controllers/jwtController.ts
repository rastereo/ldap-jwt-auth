import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import env from '../utils/envalid';
import logger from '../utils/logger';
import ErrorMessageList from '../utils/errorMessageList';
import { ldapUser } from '../types';

export const sendToken = (req: Request, res: Response): void => {
  const user = req.user as ldapUser;

  const token = jwt.sign(user, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

  res
    .status(200)
    .cookie(env.JWT_COOKIE_NAME, token, {
      maxAge: env.COOKIE_MAX_AGE,
      httpOnly: env.COOKIE_HTTP_ONLY,
      secure: env.COOKIE_SECURE,
    })
    .json(user);
};

export const verifyToken = (req: Request, res: Response): void => {
  const token = req.cookies[env.JWT_COOKIE_NAME];

  if (!token) {
    res.status(401).json({ message: ErrorMessageList.missingToken });
  } else {
    try {
      const { name } = jwt.verify(token, env.JWT_SECRET) as ldapUser;

      res.status(200).json({ name });
    } catch (err) {
      logger.error(err);

      res.status(401).json({ message: ErrorMessageList.invalidToken });
    }
  }
};
