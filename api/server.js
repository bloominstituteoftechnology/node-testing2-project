const express = require("express");
const Heros = require("../heros/herosModel.js");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "server up and running!" });
});

server.get("/heros", (req, res) => {
  Heros.getAll()
    .then(hero => {
      res.status(200).json(hero);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post("/hero", (req, res) => {
  let newHero = req.body;

  Heros.insert(newHero)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = server;
