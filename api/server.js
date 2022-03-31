const express = require("express");

const authRouter = require("./auth/auth-router.js");
const usersRouter = require("./users/users-router.js");

const server = express();

server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
