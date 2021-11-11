import express from 'express';

import post from './controllers/post';
import userMediaLink from './controllers/getUsersMediaLinks';
import update from './controllers/update';
import _delete from './controllers/delete';

const router = express.Router();

router.post('/', post);
router.get('/user/:id', userMediaLink);
router.put('/:id', update);
router.delete('/:id', _delete);

export default router;
