const express = require('express');

const Capitals = require('./capitals/capitals-model.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' })
})


module.exports = server;