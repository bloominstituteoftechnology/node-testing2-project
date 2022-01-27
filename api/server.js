const express = require("express");

const jonesesRouter = require("./joneses-router");

const server = express();

server.use(express.json());

server.use("/api/joneses", jonesesRouter);

server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
