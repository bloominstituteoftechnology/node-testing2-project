const express = require("express");
const cors = require("cors");
const teamsRouter = require("./Teams/teams-router");
const quarterbacksRouter = require("./Quarterbacks/quarterbacks-model");

const server = express();

server.use(express.json());
server.use(cors());
server.use("/api/teams", teamsRouter);
server.use("/api/quarterbacks", quarterbacksRouter);

module.exports = server;
