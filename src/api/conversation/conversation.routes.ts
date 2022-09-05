import express from 'express';

import post from './controllers/post';
import getUserConversations from './controllers/getUserConversation';
import deleteConversation from './controllers/delete';
import updateConversation from './controllers/update';
import getOneConversation from './controllers/getOneConversation';
import getUserConversationsMobile from './controllers/getUserConversationsMobile';
import checkToken from '../..//middleware/checkToken';

const router = express.Router();

router.post('/', post);
router.get('/oneconversation/:id', getOneConversation);
router.get('/:id', checkToken, getUserConversations);
router.get('/mobile/:id', getUserConversationsMobile);
router.delete('/:id', deleteConversation);
router.put('/:id', updateConversation);

export default router;
