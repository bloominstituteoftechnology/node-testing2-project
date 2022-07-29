const express = require("express");
const server = express();
const carsRouter = require('./cars/cars-router');

server.use('/api/cars', carsRouter);
server.use(express.json());


module.exports = server;