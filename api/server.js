const express = require("express");

const Dogs = require("./dogs/dogs-model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/dogs", (req, res) => {

  Dogs.getAll()
    .then(dogs => {
      res.status(200).json(dogs);
    })
    .catch(error => {
      res.status(500).json(error);
    });

});

server.get("/dogs/:id", (req, res) => {

  Dogs.getById(req.params.id)
    .then(dog => {
      res.status(200).json(dog)
    });

});

server.post("/dogs", (req, res) => {

  Dogs.insert(req.body)
    .then(dog => {
      res.status(201).json(dog)
    });

});

server.delete("/dogs/:id", (req, res) => {

  Dogs.remove(req.params.id)
    .then(dog => {
      res.json(dog)
    });

});


module.exports = server;
