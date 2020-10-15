const express = require("express");
const server = express();
const Routes = require("../Philosophers/philosophers.model");
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ data: "api working" });
});

server.get("/philosophers", (req, res) => {
  Routes.find()
    .then((resp) => {
      res.status(200).json({ Data: resp });
    })
    .catch((err) => {
      res.status(500).json({ Message: err.message });
    });
});

server.post("/philosophers", (req, res) => {
  const newPh = req.body;
  Routes.insert(newPh)
    .then((resp) => {
      res.status(201).json({ Data: resp });
    })
    .catch((err) => {
      res.status(500).json({ Message: err.message });
    });
});

server.delete("/philosophers/:id", (req, res) => {
  const id = req.params.id;
  Routes.remove(id)
    .then((resp) => {
      res.status(201).json({ Data: resp });
    })
    .catch((err) => {
      res.status(500).json({ Message: err.message });
    });
});

module.exports = server;
