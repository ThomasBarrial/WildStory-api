import express from 'express';

import getAll from './controllers/getAll';
import getUsers from './controllers/getFormationUsers';
import getOne from './controllers/getOne';
import post from './controllers/post';
import put from './controllers/update';
import delete_ from './controllers/delete';
import checkRole from '../../middleware/CheckRole';

const router = express.Router();

router.get('/users/:id', getUsers);
router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', checkRole, post);
router.put('/:id', checkRole, put);
router.delete('/:id', checkRole, delete_);

export default router;
