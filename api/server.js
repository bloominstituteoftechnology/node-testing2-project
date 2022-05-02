const express = require("express");
const knex = require('../data/db-config')
const server = express();
const carRouters = require('./cars/cars-router');

server.use(express.json());
server.use('/api/cars', carRouters);



server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
