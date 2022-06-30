import express from 'express';

import userSkills from './controllers/getUserSkills';
import getOne from './controllers/getOne';
import create from './controllers/createUserSkills';
import update from './controllers/update';
import delete_ from './controllers/delete';
import checkToken from '../../middleware/checkToken';
import checkOwner from '../../middleware/checkOwner';

const router = express.Router();

router.get('/:id', userSkills);
router.get('/oneskill/:id', getOne);
router.post('/', checkToken, create);
router.put('/:id', checkToken, checkOwner, update);
router.delete('/:id', checkToken, checkOwner, delete_);

export default router;
