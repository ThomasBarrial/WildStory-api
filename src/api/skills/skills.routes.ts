import express from 'express';

import getAll from './controllers/getAll';
import getOne from './controllers/getOne';
import post from './controllers/post';
import put from './controllers/update';
import delete_ from './controllers/delete';
import checkRole from '../../middleware/CheckRole';
import checkToken from '../../middleware/checkToken';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', checkRole, checkToken, post);
router.put('/:id', checkRole, checkToken, put);
router.delete('/:id', checkRole, checkToken, delete_);

export default router;
