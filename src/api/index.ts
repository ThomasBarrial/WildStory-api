import express from 'express';

import users from './users/users.routes';
import formations from './formations/formations.routes';
import skills from './skills/skills.routes';
import userSkills from './userSkills/userSkills.routes';
import comments from './comments/comments.routes';
import post from './post/post.routes';
import mediaIcon from './mediaIcon/media.routes';
import auth from './auth/auth.routes';
import mediaLinks from './mediaLinks/medialink.routes';

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
router.use('/comments/', comments);
router.use('/post', post);
router.use('/mediaicons', mediaIcon);
router.use('/medialinks', mediaLinks);
router.use('/auth', auth);

export default router;
