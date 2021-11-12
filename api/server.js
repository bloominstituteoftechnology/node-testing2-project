const express = require("express");

const Sample = require("./sample/sample");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/sample", (req, res) => {
  Sample.getAll()
    .then(sample => {
      res.status(200).json(sample);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/sample/:id", (req, res) => {
  Sample.getById(req.params.id)
    .then(hobbit => {
      res.status(200).json(hobbit)
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

server.post("/sample", async (req, res) => {
  Sample.insert(req.body)
    .then(hobbit => {
      res.status(201).json(hobbit)
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

server.delete("/sample/:id", (req, res) => {
  res.end()
});

server.put("/sample/:id", (req, res) => {
  res.end()
});

module.exports = server;
