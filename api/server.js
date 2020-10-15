const express = require("express");

const Posts = require('../posts/post-model')

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

// returns http 200
// returns json
// the body has an api property and the values is up

server.get("/posts", (req, res) => {
  Posts.getAll()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = server;