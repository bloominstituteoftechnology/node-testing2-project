const express = require("express");
const packageRouter = require("../packages/package-router.js");

const server = express();
server.use(express.json());
server.use("/api/packages", packageRouter);

server.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = server;
