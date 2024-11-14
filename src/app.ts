import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { celebrate, isCelebrateError, Joi, Segments } from 'celebrate';
import cors from 'cors';
import pinoHttp from 'pino-http';

import ldapAuth from './middlewares/ldapAuthMiddleware';
import { sendToken, verifyToken } from './controllers/jwtController';
import env from './config/envalid';
import rateLimitConfig from './config/rateLimitConfig';
import corsOptions from './config/corsConfig';
import logger from './config/logger';

const app: Express = express();

app.use(rateLimitConfig);

app.use(cors(corsOptions));

app.use(express.json());

app.use(helmet());

app.use(cookieParser());

app.use(pinoHttp({ logger }));

app.use(passport.initialize());

app.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().min(env.MIN_USERNAME_LENGTH).required(),
      password: Joi.string().min(env.MIN_PASSWORD_LENGTH).required(),
    }),
  }),
  ldapAuth,
  sendToken,
);

app.get(
  '/verify',
  celebrate({
    [Segments.COOKIES]: Joi.object().keys({
      [env.JWT_COOKIE_NAME]: Joi.string().required(),
    }),
  }),
  verifyToken,
);

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  logger.error(err);

  if (isCelebrateError(err)) {
    res.status(400).json({ message: 'Invalid username/password' });
  } else {
    res.status(500).json({ message: err.message });
  }
});

export default app;
