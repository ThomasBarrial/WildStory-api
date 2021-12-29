import express from 'express';
import checkToken from '../../middleware/checkToken';
import checkRole from '../../middleware/CheckRole';

import post from './controllers/post';
import getAll from './controllers/getAll';
import getPosts from './controllers/getPosts';
import getOne from './controllers/getOne';

const router = express.Router();

router.post('/', checkRole, checkToken, post);
router.get('/', getAll);
router.get('/posts/:id', getPosts);
router.get('/:id', getOne);

export default router;
