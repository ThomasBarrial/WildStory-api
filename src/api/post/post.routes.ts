import express from 'express';
import getAll from './controller/getAll';
import createPost from './controller/post';
import getUserPost from './controller/getUserPost';
import getOne from './controller/getOne';
import updatePost from './controller/update';
import deletePost from './controller/delete';
import getComments from './controller/getComments';
import getLikes from './controller/getLikes';

const router = express.Router();

router.get('/', getAll);
router.get('/user/:id', getUserPost);
router.get('/:id', getOne);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.get('/:id/comments', getComments);
router.get('/:id/likes', getLikes);

export default router;
