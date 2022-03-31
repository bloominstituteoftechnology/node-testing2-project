const express = require("express");
const server = express();
const jokesRouter = require('./jokes/jokes-router')

server.use(express.json());
server.use('/api/jokes', jokesRouter);

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;