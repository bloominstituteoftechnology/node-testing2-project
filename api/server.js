const express = require("express");
const carsModel = require("../api/cars/carsModel");
const Cars = require("../api/cars/carsModel");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/all", (req, res) => {
  Cars.getAll()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

server.delete("/:id", (req, res) => {
  const { id } = req.params;
  Cars.remove(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(error);
    });
});

server.post("/", (req, res) => {
  Cars.insert(req.body)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(error);
    });
});

server.put("/:id", (req, res) => {
  const { id } = req.params;

  Cars.update(id, req.body)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(error);
    });
});

module.exports = server;
