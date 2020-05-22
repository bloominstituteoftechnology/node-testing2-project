const express = require("express");

const Hobbits = require("../hobbits/hobbitsModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/hobbits", (req, res) => {
  Hobbits.getAll()
    .then((hobbits) => {
      res.status(200).json(hobbits);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

server.post("/hobbits", (req, res) => {
  const newHobbit = req.body;

  Hobbits.add(newHobbit)
    .then((hobbit) => {
      console.log("new hobbit added", hobbit);
      res.status(201).json(hobbit);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error adding hobbit to database", err });
    });
});

server.delete("/hobbits/:id", (req, res) => {
  const { id } = req.params;

  Hobbits.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete scheme" });
    });
});

module.exports = server;
