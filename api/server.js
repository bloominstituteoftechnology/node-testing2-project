const express = require('express');

const Smash = require('./Smash/smash-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' });
})

server.get('/smash', (req, res) => {
    Smash.getAll()
        .then(characters => {
            res.status(200).json(characters);
        })
        .catch(err => {
            res.status(404).json('characters not found')
        })
})

module.exports = server