import express from 'express';

import createLike from './controllers/post';
import deleteLike from './controllers/delete';
import updateLike from './controllers/update';
import checkToken from '../../middleware/checkToken';

const router = express.Router();

router.post('/', checkToken, createLike);
router.put('/:id', checkToken, updateLike);
router.delete('/:id', checkToken, deleteLike);

export default router;
