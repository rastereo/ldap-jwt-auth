import { celebrate, Joi, Segments } from 'celebrate';

import env from './envalid';

export const bodyValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().min(env.MIN_USERNAME_LENGTH).max(env.MAX_USERNAME_LENGTH).required(),
    password: Joi.string().min(env.MIN_PASSWORD_LENGTH).required(),
  }),
});

export const cookiesValidator = celebrate({
  [Segments.COOKIES]: Joi.object().keys({
    [env.JWT_COOKIE_NAME]: Joi.string().required(),
  }).unknown(true),
});
