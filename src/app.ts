import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { isCelebrateError } from 'celebrate';
import cors from 'cors';
import pinoHttp from 'pino-http';

import rateLimitConfig from './configs/rateLimitConfig';
import corsOptions from './configs/corsConfig';
import { logger } from './utils/logger';
import ErrorMessageList from './utils/errorMessageList';
import env from './utils/envalid';
import router from './routes/router';

const app: Express = express();

// https://express-rate-limit.mintlify.app/guides/troubleshooting-proxy-issues
app.set('trust proxy', env.TRUST_PROXY_LEVEL);

app.use(rateLimitConfig);

app.use(cors(corsOptions));

app.use(express.json());

app.use(helmet());

app.use(cookieParser());

app.use(pinoHttp({ logger }));

app.use(passport.initialize());

app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  logger.error(err);

  if (isCelebrateError(err)) {
    res.status(400).send(ErrorMessageList.validationFailed);
  } else {
    res.status(500).send(ErrorMessageList.somethingWentWrong);
  }
});

export default app;
