import express from 'express';
import getAll from './controller/getAll';
import createPost from './controller/post';
import getUserPost from './controller/getUserPost';
import getOne from './controller/getOne';
import updatePost from './controller/update';
import deletePost from './controller/delete';

const router = express.Router();

router.get('/', getAll);
router.get('/user/:id', getUserPost);
router.get('/:id', getOne);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
