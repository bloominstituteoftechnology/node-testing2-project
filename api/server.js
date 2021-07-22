const express = require("express");

const Book = require("./books/books-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "Running!" });
});

server.get("/books", (req, res) => {
  Book.getAll()
    .then(books => {
      res.status(200).json(books);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post("/books", async (req, res) => {
  try {
      const data = await Book.create(req.body)
      res.status(201).json(data)
  } catch (error) {
      res.status(500).json(error)
  }
});

server.delete("/books/:id", async (req, res) => {
  try {
      const data = await Book.remove(req.params.id)
      res.statis(204).json(data)
  } catch (error) {
      res.status(500).json(error)
  }
});


module.exports = server;