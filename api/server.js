const express = require("express");

// const Hobbits = require("./hobbits/hobbits-model.js");
//Think I can move this to the router file

const server = express();

const hobbitRouter = require("./hobbits/hobbit-router.js");

server.use(express.json());

server.use("/api/hobbits", hobbitRouter);

server.get("/", (req, res) => {
    res.json({ api: "up" });
  });

module.exports = server;

//review guided project to make sure server is set up correctly
