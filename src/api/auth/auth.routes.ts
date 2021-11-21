import express from 'express';

import login from './controllers/login';
import logout from './controllers/logout';
import me from './controllers/me';

const router = express.Router();

router.post('/login', login);
router.get('/me', me);
router.get('/logout', logout);

export default router;
