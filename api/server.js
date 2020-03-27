const express = require("express");
const friendsRouter = require("../friends/friendsRouter");

const server = express();

server.use(express.json());

server.use("/api/friends", friendsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
