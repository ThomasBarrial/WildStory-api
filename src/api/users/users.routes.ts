import express from 'express';

import getAll from './controllers/getAll';
import getOne from './controllers/getOne';
import post from './controllers/post';
import put from './controllers/update';
import delete_ from './controllers/delete';
import checkRole from '../../middleware/CheckRole';
import editPassword from './controllers/editPassword';
import checkToken from '../../middleware/checkToken';
import checkOwner from '../../middleware/checkOwner';
import Joi from 'joi';
import bodyValidator from '../../middleware/bodyValidator';
const regex =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  profiTitle: Joi.string(),
  city: Joi.string(),
  birthDate: Joi.string(),
  idFormation: Joi.string().regex(regex).required(),
});

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.put('/self/password', checkToken, editPassword);
router.post('/', bodyValidator(userSchema), post);
router.put('/:id', checkToken, checkOwner, put);
router.delete('/:id', checkRole, checkToken, checkOwner, delete_); // addinng _ here because 'delete' is a reserved name

export default router;
