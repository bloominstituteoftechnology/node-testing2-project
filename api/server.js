const express = require("express");
const Users = require("../users/users-model.js");



const server = express();
server.use(express.json());



server.get("/", (req, res) => {
  res.status(200).json({ api: "up!" });
});

server.get("/users", (req, res) => {
  Users.getAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/users/id", (req, res) => {
  res.end()
});

server.post("/users", async (req, res) => {
  res
    .status(201)
    .json(await Users.insert(req.body))
});

server.delete("/users/:id", (req, res) => {
  res.end()
});

server.put("/users/:id", (req, res) => {
  res.end()
});

module.exports = server;
