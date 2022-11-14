const express = require("express");

const User = require('./users/users-model')

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get('/users', (req, res) => {
  User.getAll()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

server.get('/users/:id', (req, res) => {
  User.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

module.exports = server