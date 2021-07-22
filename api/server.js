const express = require("express");

const Hobbits = require("./hobbits/hobbits-model.js");

const server = express();

server.use(express.json());

server.post("/hobbits", async (req, res, next) => {
  try {
    res.status(201)
      .json(await Hobbits.insert(req.body))
  } catch (err) {
    next(err)
  }
});

server.delete("/hobbits/:id", (req, res) => {
  res.end()
});

module.exports = server;
