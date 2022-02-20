import express from 'express';

import post from './controllers/post';
import userMediaLink from './controllers/getUsersMediaLinks';
import update from './controllers/update';
import _delete from './controllers/delete';
import checkToken from '../../middleware/checkToken';

const router = express.Router();

router.post('/', checkToken, post);
router.get('/user/:id', userMediaLink);
router.put('/:id', checkToken, update);
router.delete('/:id', checkToken, _delete);

export default router;
