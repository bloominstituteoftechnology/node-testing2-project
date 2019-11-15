const express = require("express");

const usersRouter = require("../users/users-router.js");

const server = express();

server.use(express.json());

server.use("/users", usersRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up", environment: process.env.DB_ENV });
}); 

module.exports = server;
