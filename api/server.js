const express = require('express');

const bestBooksModel = require('./best-books-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/bestbooks', (req, res) => {
  bestBooksModel
    .getAll()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

server.get('/bestbooks/:id', (req, res) => {
  bestBooksModel.getById(req.params.id).then((book) => {
    res.status(200).json(book);
  });
});

server.post('/bestbooks', (req, res) => {
  bestBooksModel.insert(req.body).then((book) => {
    res.status(201).json(book);
  });
});

server.put('/bestbooks/:id', (req, res) => {
  bestBooksModel.update(req.params.id, req.body).then((book) => {
    res.json(book);
  });
});

server.delete('/bestbooks/:id', (req, res) => {
  bestBooksModel.remove(req.params.id).then((book) => {
    res.json(book);
  });
});

module.exports = server;
