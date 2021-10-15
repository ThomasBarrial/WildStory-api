import express from 'express';

import getAll from './controller/getAll';
import createPost from './controller/post';
import getUserPost from './controller/getUserPost';
import getOne from './controller/getOne';
import updatePost from './controller/update';

const router = express.Router();

router.get('/', getAll);
router.get('/user/:id', getUserPost);
router.get('/:id', getOne);
router.post('/', createPost);
router.put('/:id', updatePost);

export default router;
