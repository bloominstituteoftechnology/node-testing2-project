const express = require("express");

const phoneRouter = require("./phones/phones-router");

const server = express();
server.use(express.json());
server.use('/api/phones', phoneRouter);


module.exports = server;
