import express from 'express';

import users from './users/users.routes';
import formations from './formations/formations.routes';
import skills from './skills/skills.routes';
import userSkills from './userSkills/userSkills.routes';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/users', users);
router.use('/formations', formations);
router.use('/skills', skills);
router.use('/userskills', userSkills);

export default router;
