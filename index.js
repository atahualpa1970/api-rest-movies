'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const movies = require('./models/movies')

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/movies', (req, res) => {
    movies.find({}, (err, movie) => {
        if (err) return res.status(500).send({message: `Error en petición: ${err}`})
        if (!movie) return res.status(404).send({message: 'No existen peliculas'})

        res.status(200).send({ movies: movie })
    })
})

app.get('/api/movies/:movieId', (req, res) => {
    let movieId = req.params.movieId

    movies.findById(movieId, (err, movie) => {
        if (err) return res.status(500).send({message: `Error en petición: ${err}`})
        if (!movie) return res.status(404).send({message: 'La pelicula no existe'})
        
        res.status(200).send({ movie })
    })
})

app.post('/api/movies', (req, res) => {
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
})

app.put('/api/movies/:movieId', (req, res) => {
    let movieId = req.params.movieId
    let update = req.body

    movies.findByIdAndUpdate(movieId, update, (err, movieUpdated) => {
        if (err) return res.status(500).send({message: `Error al actualizar los datos: ${err}`}) 

        res.status(200).send({ movie: movieUpdated })
    })
})

app.delete('/api/movies/:movieId', (req, res) => {
    let movieId = req.params.movieId

    movies.findById(movieId, (err, movie) => {
        if (err) return res.status(500).send({message: `Error al borrar la película: ${err}`})

        movie.remove(err => {
            if (err) return res.status(500).send({message: `Error al borrar la película: ${err}`})
            res.status(200).send({ message: 'La película ha sido eliminada' }) 
        })        
    })
})


mongoose.connect('mongodb://localhost:27017/movieDB', (err, res) => {
    if (err) {
        return console.log(`Error al conectar con mongodb. ${err}`)
    }
    console.log('Conexión a movieDB establecida...')

    app.listen(port, () => {
        console.log(`API REST corriendo en http://localhost:${port}`)
    })
})