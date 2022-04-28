const express = require('express');

const Smash = require('./Smash/smash-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' })
})


module.exports = server