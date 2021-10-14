// build your server here and require it from index.js
const express = require("express");
const jokesRouter = require("./jokes/jokes-router")

const server = express();

server.use(express.json());
server.use("/api/jokes", jokesRouter)

server.use("*", (req, res) => {
  res.json({ api: "is up and running!" });
});

module.exports = server;