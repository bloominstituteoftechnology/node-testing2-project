const express = require("express");

const server = express();

server.use(express.json());


server.get("/", (req, res) => {
    res.json({ api: "up" });
  });

module.exports = server;

//review guided project to make sure server is set up correctly
