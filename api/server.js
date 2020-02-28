//  Import depmendencies >>>>>>>

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const usersRouter = require("../users/users-router.js");

const server = express();

//Middleware >>>>>>>

server.use(helmet());
server.use(express.json());
server.use(cors());

//  Routes >>>>>>>
server.use("/api/users-router", usersRouter);

//  Sanity Check >>>>>>>
server.get("/", (req, res) => {
  res.json({ api: "Up and at em on Thursday!" });
});

module.exports = server;
