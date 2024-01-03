const express = require("express");
const server = express();
const dirtbikeRouter = require("./api/ditbikeRouter");

server.use(express.json());
server.use("/dirtbikes", dirtbikeRouter);

module.exports = server;
