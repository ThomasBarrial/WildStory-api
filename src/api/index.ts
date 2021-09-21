const { Router } = require('express');

const tracks = require('./tracks/tracks.routes');
const albums = require('./albums/albums.routes');

const router = Router();

router.use('/tracks', tracks);
router.use('/albums', albums);

module.exports = router;
