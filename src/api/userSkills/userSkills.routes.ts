import express from 'express';

import userSkills from './controllers/getUserSkills';
import getOne from './controllers/getOne';
import create from './controllers/createUserSkills';
import update from './controllers/update';
import delete_ from './controllers/delete';

const router = express.Router();

router.get('/:id', userSkills);
router.get('/oneskill/:id', getOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', delete_);

export default router;
