import rateLimit from 'express-rate-limit'; // https://github.com/express-rate-limit/express-rate-limit
import env from '../utils/envalid';

const rateLimitConfig = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  limit: env.RATE_LIMIT,
});

export default rateLimitConfig;
