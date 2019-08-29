const express = require("express");

const Books = require("../books/bookModel.js");

const server = express;

server.use(express.json());

server.get("/", (req, res) => {
  Books.getAll()
    .then(books => {
      res.status(200).json(books);
    })
    .catch(error => {
      res.status(500).json({ message: "oops, nope" });
    });
});

server.delete("/:id", (req, res) => {
  Books.delete(id)
    .then(books => {
      res.status(201).json({ message: "deleted" });
    })
    .catch(error => {
      res.status(500);
    });
});

module.exports = server;
