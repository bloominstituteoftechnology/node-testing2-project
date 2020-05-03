const express = require("express");

const configMiddleware = require("./configMiddleware.js");

const authRouter = require("../auth/auth-router.js");
const restrictedMiddleware = require("../auth/restricted-middleware.js");

const UserTbl = require("../users/userModel.js");

const server = express();
configMiddleware(server);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.use("/api/auth", authRouter);
server.get("/users", restrictedMiddleware, (req, res) => {
  UserTbl.getAll()
    .then((userList) => {
      res.send(userList);
    })
    .catch((err) => {
      res.status(500).json({ message: "error getting users" });
    });
});

module.exports = server;
