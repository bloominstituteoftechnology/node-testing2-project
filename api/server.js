const path = require('path')
const express = require("express");

const jonesesRouter = require("./joneses/joneses-router");

const server = express();

server.use(express.json());

server.use("/api/joneses", jonesesRouter);

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'))
})

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
