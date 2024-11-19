import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { isCelebrateError, Segments } from 'celebrate';
import cors from 'cors';
import pinoHttp from 'pino-http';

import ldapAuth from './middlewares/ldapAuthMiddleware';
import { sendToken, verifyToken } from './controllers/jwtController';
import rateLimitConfig from './configs/rateLimitConfig';
import corsOptions from './configs/corsConfig';
import logger from './utils/logger';
import ErrorMessageList from './utils/errorMessageList';
import { bodyValidator, cookiesValidator } from './utils/celebrateValidator';
import env from './utils/envalid';

const app: Express = express();

app.set('trust proxy', env.TRUST_PROXY_LEVEL); // https://express-rate-limit.mintlify.app/guides/troubleshooting-proxy-issues

app.use(rateLimitConfig);

app.use(cors(corsOptions));

app.use(express.json());

app.use(helmet());

app.use(cookieParser());

app.use(pinoHttp({ logger }));

app.use(passport.initialize());

app.post(env.LOGIN_PATH, bodyValidator, ldapAuth, sendToken);

app.get(env.VERIFY_PATH, cookiesValidator, verifyToken);

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({ message: ErrorMessageList.notFound });
});

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  logger.error(err);

  if (isCelebrateError(err)) {
    res.status(400).json({ message: ErrorMessageList.validationFailed });
  } else {
    res.status(500).json({ message: ErrorMessageList.somethingWentWrong });
  }
});

export default app;
