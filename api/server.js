const express = require('express');

const movieRouter = require('./movies/movieRouter.js');

const server = express();

server.use(express.json());

server.use('/api/movies', movieRouter);


module.exports = server;
