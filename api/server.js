const express = require("express");

const gamesRouter = require("./games/games-router")

const server = express();

server.use(express.json());
server.use("/api/games", gamesRouter)

// server.get("*", (req, res, next) => {
//   res.json("server")
//   next()
// })

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = server;
