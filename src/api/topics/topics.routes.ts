import express from 'express';
import checkToken from '../../middleware/checkToken';
import checkRole from '../../middleware/CheckRole';

import post from './controllers/post';
import getAll from './controllers/getAll';
import getPosts from './controllers/getPosts';
import getOne from './controllers/getOne';
import _delete from './controllers/delete';
import update from './controllers/update';

const router = express.Router();

router.post('/', checkRole, checkToken, post);
router.get('/', getAll);
router.get('/posts/:id', getPosts);
router.get('/:id', getOne);
router.put('/:id', checkToken, checkRole, update);
router.delete('/:id', checkToken, checkRole, _delete);

export default router;
