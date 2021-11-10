import express from 'express';

import post from './controllers/post';
import getAll from './controllers/getAll';
import getOne from './controllers/getOne';
import put from './controllers/update';
import _delete from './controllers/delete';

const router = express.Router();

router.get('/', getAll);
router.post('/', post);
router.get('/:id', getOne);
router.put('/:id', put);
router.delete('/:id', _delete);

export default router;
