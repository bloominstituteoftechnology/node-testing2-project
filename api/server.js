const express = require('express');

const Cubs = require('../cubs/cubs-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/cubs', (req, res) => {
  Cubs.find()
    .then((cubs) => {
      res.json(cubs);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to get Cubs' });
    });
});

server.post('/cubs', (req, res) => {
  const newCub = req.body;

  Cubs.add(newCub)
    .then((cub) => {
      res.status(201).json(cub);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to create new Cub' });
    });
});

server.delete('/cubs/:id', (req, res) => {
  const { id } = req.params;

  Cubs.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find Cub with given id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to delete Cub' });
    });
});

module.exports = server;
