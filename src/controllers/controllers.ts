import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import env from '../utils/envalid';
import { accessLogger, logger } from '../utils/logger';
import ErrorMessageList from '../utils/errorMessageList';
import { ldapUser } from '../types';

export const sendToken = (req: Request, res: Response): void => {
  const user = req.user as ldapUser;

  accessLogger.info({ name: user.name, url: req.url, host: req.headers.host });

  const token = jwt.sign(user, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

  res
    .status(200)
    .cookie(env.JWT_COOKIE_NAME, token, {
      maxAge: env.COOKIE_MAX_AGE,
      httpOnly: env.COOKIE_HTTP_ONLY,
      secure: env.COOKIE_SECURE,
      path: env.COOKIE_PATH,
      sameSite: env.COOKIE_SAME_SITE,
    })
    .json(user);
};

export const sendName = (req: Request, res: Response): void => {
  res.status(200).json({ name: req.user })
};

export const deleteCookie = (req: Request, res: Response): void => {
  res.clearCookie(env.JWT_COOKIE_NAME, { path: env.COOKIE_PATH });
  res.status(200).json({ message: ErrorMessageList.logout });
};

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({ message: ErrorMessageList.notFound });
}
