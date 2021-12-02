import express from 'express';

import createLike from './controllers/post';
import deleteLike from './controllers/delete';

const router = express.Router();

router.post('/', createLike);
router.delete('/:id', deleteLike);

export default router;
