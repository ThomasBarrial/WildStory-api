import express from 'express';

import post from './controllers/post';
import getUserConversations from './controllers/getUserConversation';
import deleteConversation from './controllers/delete';
import updateConversation from './controllers/update';
import getOneConversation from './controllers/getOneConversation';

const router = express.Router();

router.post('/', post);
router.get('/oneconversation/:id', getOneConversation);
router.get('/:id', getUserConversations);
router.delete('/:id', deleteConversation);
router.put('/:id', updateConversation);

export default router;
