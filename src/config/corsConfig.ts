import { CorsOptions } from 'cors'; // https://github.com/expressjs/cors

import env from './envalid';

const corsOptions: CorsOptions = {
  origin: env.CORS_ALLOWED_ORIGIN.split(','),
};

export default corsOptions;
