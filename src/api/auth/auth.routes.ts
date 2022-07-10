import express from 'express';

import login from './controllers/login';
import loginMobile from './controllers/loginMobil';
import logout from './controllers/logout';
import me from './controllers/me';
import meMobile from './controllers/meMobile';

const router = express.Router();

router.post('/login', login);
router.post('/login/mobile', loginMobile);
router.get('/me/mobile', meMobile);
router.get('/me', me);
router.get('/logout', logout);

export default router;
