const express = require("express");
const server = express();
const usersRouter = require("./users/users_router");

server.use(express.json());

server.use("/api/user", usersRouter);

module.exports = server;
