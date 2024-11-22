import { Router } from 'express';

import env from '../utils/envalid';
import ldapAuth from '../middlewares/ldapAuthMiddleware';
import jwtVerify from '../middlewares/jwtMiddleware';
import { deleteCookie, notFound, sendName, sendToken } from '../controllers/controllers';
import { bodyValidator, cookiesValidator } from '../utils/celebrateValidator';

const router = Router();

router.post(env.LOGIN_PATH, bodyValidator, ldapAuth, sendToken);

router.get(env.VERIFY_PATH, cookiesValidator, jwtVerify, sendName);

router.get(env.LOGOUT_PATH, cookiesValidator, jwtVerify, deleteCookie);

router.all('*', notFound);

export default router;
