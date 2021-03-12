'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = Schema({
    name: String,
    director: String,
    clasification: { type: String, enum: [
        'Infantil',
        'Comedia',
        'Drama',
        'Terror',
        'Romance',
        'Accion']}
})

module.exports = mongoose.model('movies', movieSchema)