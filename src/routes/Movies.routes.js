const express = require('express');
const { MoviesContorllers } = require('../controllers/Movies.controllers');
const { AuthToken } = require('../middleware/AuthToken.middleware');

const router = express.Router();

const movies = new MoviesContorllers

router.get('/get_movies',movies.getMovies())
router.get('/search_media',movies.searchMedia())
router.get('/get_tvshows',movies.getTvShows())
router.post('/add_fav',AuthToken(),movies.favMovies())
router.post('/remove_fav',AuthToken(),movies.removeMovies())
router.get('/get_fav',AuthToken(),movies.getFavMovies())
router.post('/add_to_liked_movies',AuthToken(),movies.addToLikedMovies())
router.get('/get_liked_movies',AuthToken(),movies.getLikedMovies())
router.post('/remove_like_movie',AuthToken(),movies.removeLikeMovie())
router.get('/up_comings',AuthToken(),movies.upComingMovies())
router.post('/set_movie_reminder',AuthToken(),movies.setReminder())


exports.router = router;
