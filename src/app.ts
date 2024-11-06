import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

const app: Express = express();

app.use(express.json());

app.use(helmet());

app.post('/auth', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
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
