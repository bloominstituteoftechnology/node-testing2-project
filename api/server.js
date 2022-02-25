const express = require("express");

const Penguins = require("./penguins/penguins-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/penguins", (req, res) => {
  Penguins.getAll()
    .then(penguins => {
      res.status(200).json(penguins);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/penguins/:id", (req, res) => {
  Penguins.getById(req.params.id)
    .then(penguin => {
      res.status(200).json(penguin)
    })
});

server.post("/penguins", (req, res) => {
  Penguins.insert(req.body)
    .then(penguin => {
      res.status(201).json(penguin)
    });
});

module.exports = server;
