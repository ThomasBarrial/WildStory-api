import express from 'express';
import checkToken from '../../middleware/checkToken';

import post from './controllers/post';
import getUserFollowers from './controllers/getUserFollowers';
import getUserFollowings from './controllers/getUsersFollowing';
import deleteFollow_ from './controllers/delete';

const router = express.Router();

router.post('/', checkToken, post);
router.get('/followers/:id', checkToken, getUserFollowers);
router.get('/followings/:id', checkToken, getUserFollowings);
router.delete('/:id', checkToken, deleteFollow_);

export default router;
