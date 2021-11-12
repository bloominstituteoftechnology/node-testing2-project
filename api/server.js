const express = require("express");
const Pets = require("./pets/pets-model.js");

const server = express();

server.use(express.json());


server.get("/", (req, res) => {
    res.status(200).json({ api: "running" });
  });

  server.get("/pets", (req, res) => {
    Pets.getAll()
      .then(pets => {
        res.status(200).json(pets);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  server.get("/pets/:id", async (req, res) => {
    res.json(await Pets.getById(req.params.id))
  });
  
  server.post("/pets", async (req, res) => {
    res
    .status(201)
    .json(await Pets.insert(req.body))
  });

  module.exports = server;
