import { CorsOptions } from 'cors'; // https://github.com/expressjs/cors

import env from '../utils/envalid';

const corsOptions: CorsOptions = {
  origin: env.CORS_ALLOWED_ORIGIN.split(','),
  credentials: true,
};

export default corsOptions;
