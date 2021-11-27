import express from 'express';

import getAll from './controllers/getAll';
import postComment from './controllers/post';
import deleteComment from './controllers/delete';
import checkToken from '../../middleware/checkToken';

const router = express.Router();

router.get('/', checkToken, getAll);
router.post('/', checkToken, postComment);
router.delete('/:id', checkToken, deleteComment);

export default router;
