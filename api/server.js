const express = require("express");

const server = express();

const plantsRouter = require('./plants/plants-router')

server.use(express.json());

server.use('/api/plants', plantsRouter)

module.exports = server