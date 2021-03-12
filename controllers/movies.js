'use strict'

const movies = require('../models/movies')

function getMovies(req, res) {
    movies.find({}, (err, movie) => {
        if (err) return res.status(500).send({message: `Error en petición: ${err}`})
        if (!movie) return res.status(404).send({message: 'No existen peliculas'})

        res.status(200).send({ movies: movie })
    })
}

function getMovie(req, res) {
    let movieId = req.params.movieId

    movies.findById(movieId, (err, movie) => {
        if (err) return res.status(500).send({message: `Error en petición: ${err}`})
        if (!movie) return res.status(404).send({message: 'La pelicula no existe'})
        
        res.status(200).send({ movie })
    })
}

function saveMovie(req, res) {
    console.log('POST /api/movies')
    console.log(req.body)
    
    let movie = new movies()
    movie.name = req.body.name
    movie.director = req.body.director
    movie.clasification = req.body.clasification

    movie.save((err, movieStored) => {
        if (err) res.status(500).save({message: `Error al guardar en la BD ${err}`})

        res.status(200).send({movie: movieStored})
    })
}

function updateMovie(req, res) {
    let movieId = req.params.movieId
    let update = req.body

    movies.findByIdAndUpdate(movieId, update, (err, movieUpdated) => {
        if (err) return res.status(500).send({message: `Error al actualizar los datos: ${err}`}) 

        res.status(200).send({ movie: movieUpdated })
    })
}

function deleteMovie(req, res) {
    let movieId = req.params.movieId

    movies.findById(movieId, (err, movie) => {
        if (err) return res.status(500).send({message: `Error al borrar la película: ${err}`})

        movie.remove(err => {
            if (err) return res.status(500).send({message: `Error al borrar la película: ${err}`})
            res.status(200).send({ message: 'La película ha sido eliminada' }) 
        })        
    })
}

module.exports = {
    getMovies,
    getMovie,
    saveMovie,
    updateMovie,
    deleteMovie
}