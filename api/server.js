const express = require("express");

//const Dogs = require("");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/dogs", (req, res) => {

//   Hobbits.getAll()
//     .then(hobbits => {
//       res.status(200).json(hobbits);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });

});

server.get("/dogs/:id", (req, res) => {

//   Hobbits.getById(req.params.id)
//     .then(hobbit => {
//       res.status(200).json(hobbit)
//     });

});

server.post("/dogs", (req, res) => {

//   Hobbits.insert(req.body)
//     .then(hobbit => {
//       res.status(201).json(hobbit)
//     });

});

server.delete("/dogss/:id", (req, res) => {

//   Hobbits.remove(req.params.id)
//     .then(hobbit => {
//       res.json(hobbit)
//     });

});


module.exports = server;
