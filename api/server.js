const express = require("express");

const CryptoRouter = require("./crypto/router");

const server = express();

server.use(express.json());
server.use("/api/crypto", CryptoRouter);

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
