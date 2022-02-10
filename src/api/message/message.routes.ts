import express from 'express';
import checkToken from '../../middleware/checkToken';

import post from './controllers/post';
import getConversationMessages from './controllers/getConversationMessages';

const router = express.Router();

router.post('/', checkToken, post);
router.get('/conversation/:id', checkToken, getConversationMessages);

export default router;
