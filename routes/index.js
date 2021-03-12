'use strict'

const express = require('express')
const api = express.Router()
const movieControllers = require('../controllers/movies')

api.get('/movies', movieControllers.getMovies )
api.get('/movies/:movieId', movieControllers.getMovie)
api.post('/movies', movieControllers.saveMovie)
api.put('/movies/:movieId', movieControllers.updateMovie)
api.delete('/movies/:movieId', movieControllers.deleteMovie)

module.exports = api