const express = require("express");
const User = require("./users/users-model");
const server = express();

server.use(express.json());

// [GET] - API running
server.get("/", (req, res) => {
  res.status(200).json({ api: "running " });
});

// [GET] - All users
server.get("/users", (req, res) => {
  User.getAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// [GET] User By Id
server.get("/users/:id", (req, res) => {
  User.getById(req.params.id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// [POST] - Insert new user
server.post("/users", (req, res) => {
  User.insert(req.body)
    .then((user) => res.json(user))
    .catch((error) => {
      res.status(500).json(error);
    });
});

// [DELETE] - delete user
server.delete("/users/:id", (req, res) => {
  User.remove(req.params.id)
    .then((result) => {
      if (result) {
        res.sendStatus(204);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// [PUT] - update user
server.put("/users/:id", (req, res) => {
  User.update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = server;
