const express = require('express');

const Festivals = require('../festivals/festivalsModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up', dbenv: process.env.DB_ENV });
});

module.exports = server;
