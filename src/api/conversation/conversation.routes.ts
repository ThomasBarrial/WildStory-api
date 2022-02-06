import express from 'express';
import checkToken from '../../middleware/checkToken';

import post from './controllers/post';
import getUserConversations from './controllers/getUserConversation';

const router = express.Router();

router.post('/', checkToken, post);
router.get('/:id', getUserConversations);

export default router;
