const express = require("express");
const packageRouter = require("../packages/package-router.js");

const server = express();
server.use(express.json());
server.use("/api/packages", packageRouter);

module.exports = server;
