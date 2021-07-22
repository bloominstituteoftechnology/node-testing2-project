const express = require('express');
const pokemonRouter = require('./api/pokemon-router');

const server = express();

server.use(express.json());
server.use('/api/pokemon', pokemonRouter);


module.exports = server;