import express from 'express';
import checkToken from '../../middleware/checkToken';

import getUserPostSaved from './controllers/getUsersPostsSaved';
import post from './controllers/post';
import _delete from './controllers/delete';

const router = express.Router();

router.post('/', checkToken, post);
router.get('/user/:id', getUserPostSaved);
router.delete('/:id', checkToken, _delete);

export default router;
