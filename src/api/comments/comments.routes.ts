import express from 'express';

import getAll from './controllers/getAll';
import postComment from './controllers/post';
import deleteComment from './controllers/delete';

const router = express.Router();

router.get('/', getAll);
router.post('/', postComment);
router.delete('/:id', deleteComment);

export default router;
