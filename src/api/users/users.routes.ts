import express from 'express';

import getAll from './controllers/getAll';
import getOne from './controllers/getOne';
import post from './controllers/post';
import put from './controllers/update';
import delete_ from './controllers/delete';
import checkRole from '../../middleware/CheckRole';
import editPassword from './controllers/editPassword';
import checkToken from '../../middleware/checkToken';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.put('/self/password', checkToken, editPassword);
router.post('/', post);
router.put('/:id', checkToken, put);
router.delete('/:id', checkRole, delete_); // addinng _ here because 'delete' is a reserved name

export default router;
