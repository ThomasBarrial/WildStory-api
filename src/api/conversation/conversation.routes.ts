import express from 'express';
import checkToken from '../../middleware/checkToken';

import post from './controllers/post';
import getUserConversations from './controllers/getUserConversation';
import deleteConversation from './controllers/delete';

const router = express.Router();

router.post('/', checkToken, post);
router.get('/:id', getUserConversations);
router.delete('/:id', checkToken, deleteConversation);

export default router;
