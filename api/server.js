const express = require("express");
const router = require("./players/players-router");
const server = express();

server.use(express.json());

server.use("/players", router);

module.exports = server;
