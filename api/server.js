const express = require('express');

const Capitals = require('./capitals/capitals-model.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' })
})

server.get('/capitals', (req, res) => {
    Capitals.getAll()
        .then(capitals => {
            res.status(200).json(capitals)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


module.exports = server;