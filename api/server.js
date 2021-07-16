const express = require("express");
const helmet = require("helmet");
 const UserRouter = require("./users/users-router");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/users", UserRouter);

server.get("/", (req, res) => {
    res.status(200).json({ api: "Welcome to the dark side. This server has cookie... or tokens" })
  })

module.exports = server;
