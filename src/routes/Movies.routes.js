const express = require('express');
const { MoviesContorllers } = require('../controllers/Movies.controllers')

const router = express.Router();

const movies = new MoviesContorllers

router.post('/insert_to_db',movies.insertMovies())

exports.router = router;
