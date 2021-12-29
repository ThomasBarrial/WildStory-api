import express from 'express';

import getAll from './controllers/getAll';
import getUsers from './controllers/getFormationUsers';
import getOne from './controllers/getOne';
import post from './controllers/post';
import put from './controllers/update';
import delete_ from './controllers/delete';

const router = express.Router();

router.get('/users/:id', getUsers);
router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', post);
router.put('/:id', put);
router.delete('/:id', delete_);

export default router;
