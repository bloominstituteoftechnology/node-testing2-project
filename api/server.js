const express = require("express");
const server = express();
server.use(express.json());

const Children = require("./children/children-model");

server.get("/", (req, res) => {
  res.status(200).json({ message: "it's working" });
});

server.get("/children", (req, res, next) => {
  // res.status(200).json({message: "fetching children"})
  Children.getAll()
    .then((child) => {
      res.status(200).json(child);
    })
    .catch(next);
});

server.get("/children/:id", (req, res, next) => {
  // res.status(200).json({message: `fetching child w/id: ${req.params.id}`})
  Children.getByID(req.params.id)
    .then((child) => {
      res.status(200).json(child);
    })
    .catch(next);
});
server.post("/children", (req, res, next) => {
  // res.status(201).json({message: `add child: ${req.body}`})
  Children.make(req.body)
    .then((child) => {
      res.status(201).json(child);
    })
    .catch(next);
});

server.use((err, req, res, next) => {
  // eslint-disable-line

  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
