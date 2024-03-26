const express = require('express');
const router = express.Router();
const movieController = require('../controllers/MovieController.js');


router.get('/:id', movieController.infoMovie);
router.get('/popular', movieController.getMovieList);
router.get('/videos/:id', movieController.getVideos);
router.get('/search', movieController.searchMovie);
router.get('/credits/:id', movieController.getCredits);

// router.get('/discovery/movie', movieController.getDiscover);
module.exports = router;