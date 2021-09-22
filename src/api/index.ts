import express from 'express';

import users from './users/users.routes';
import formations from './formations/formations.routes';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/users', users);
router.use('/formations', formations);

export default router;
