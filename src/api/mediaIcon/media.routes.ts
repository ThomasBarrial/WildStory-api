import express from 'express';

import post from './controllers/post';
import getAll from './controllers/getAll';
import getOne from './controllers/getOne';
import put from './controllers/update';
import _delete from './controllers/delete';
import checkToken from '../../middleware/checkToken';
import checkRole from '../../middleware/CheckRole';

const router = express.Router();

router.get('/', getAll);
router.post('/', checkToken, checkRole, post);
router.get('/:id', getOne);
router.put('/:id', checkToken, checkRole, put);
router.delete('/:id', checkToken, checkRole, _delete);

export default router;
