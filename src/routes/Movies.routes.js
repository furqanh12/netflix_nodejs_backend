const express = require('express');
const { MoviesContorllers } = require('../controllers/Movies.controllers');
const { AuthToken } = require('../middleware/AuthToken.middleware');

const router = express.Router();

const movies = new MoviesContorllers

router.get('/get_movies',movies.getMovies())
router.post('/add_fav',AuthToken(),movies.favMovies())
router.post('/remove_fav',AuthToken(),movies.removeMovies())
router.get('/get_fav',AuthToken(),movies.getFavMovies())

exports.router = router;
