const express = require("express");

const server = express();

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = server;
