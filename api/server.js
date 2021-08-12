const express = require("express");
const Users = require("./users/users-model");
const server = express();

server.use(express.json());

server.get("/", (re, res) => {
  res.status(200).json({ api: "running " });
});

server.get("/users", (req, res) => {
  Users.getAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});
