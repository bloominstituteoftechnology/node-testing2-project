const express = require("express");

const server = express();

server.get("*", (req, res, next) => {
  res.json("server")
  next()
})

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = server;
