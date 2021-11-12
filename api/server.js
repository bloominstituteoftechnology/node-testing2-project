const express = require("express");

const infoRouter = require("./info/info-router");

const server = express();

server.use(express.json());

server.use("/api/info", infoRouter);

module.exports = server;