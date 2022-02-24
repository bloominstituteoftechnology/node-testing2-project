const express = require("express");

const Cars = require("./cars/cars-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/cars", (req, res) => {
  Cars.getAll()
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

server.get("/cars/:id", async (req, res) => {
  res.json(await Cars.getById(req.params.id));
});

server.post("/cars", async (req, res) => {
  res.status(201).json(await Cars.insert(req.body));
});

module.exports = server;
