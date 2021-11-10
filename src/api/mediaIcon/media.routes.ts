import express from 'express';

import post from './controllers/post';

const router = express.Router();

router.get('/', post);
