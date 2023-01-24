const express = require('express');
const { MoviesContorllers } = require('../controllers/Movies.controllers')

const router = express.Router();

const movies = new MoviesContorllers

router.get('/get_movies',movies.getMovies())

exports.router = router;
