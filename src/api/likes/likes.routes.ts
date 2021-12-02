import express from 'express';

import createLike from './controllers/post';
import deleteLike from './controllers/delete';
import updateLike from './controllers/update';

const router = express.Router();

router.post('/', createLike);
router.put('/:id', updateLike);
router.delete('/:id', deleteLike);

export default router;
