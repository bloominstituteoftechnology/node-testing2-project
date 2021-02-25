const express = require("express");
const server = express();
const jediRouter = require('./jedi/router')

server.use(express.json());
server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
  });
server.use('/api/jedi', jediRouter)

module.exports = server;
