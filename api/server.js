// npm import / server declaration
const express = require('express');
const server = express();

// model import
const Cats = require('./cats/cats-model');

// allow json 
server.use(express.json());

// sanity check
server.get("/api", (req, res) => {
    res.status(200).json({ api: "up" });
});

// /api/cats GET- returns list of cats
server.get("/api/cats", (req, res) => {
    Cats.getAll()
    .then(cats => {
      res.status(200).json(cats);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// /api/cats/:id GET- returns specific cat
server.get("/api/cats/:id", (req, res) => {
    Cats.getById(req.params.id)
      .then(cat => {
        if(cat) {
          res.json(cat);
        } else {
          res.status(404).json({ message: 'Oops! 404, Cat not available!' });
        }
      })
  });

// /api/cats POST- posts cat
server.post("/api/cats", (req, res) => {
    const cats = req.body;
    Cats.insert(cats)
        .then(cats => {
        res.status(201).json(cats);
    });
});

// /api/cats DELETE- deletes cat
server.delete("/api/cats/:id", (req, res) => {
    Cats.remove(req.params.id)
        .then(cats => {
        if(cats) {
            res.json(cats);
        } else {
            res.status(404).json({ message: 'cats not found' });
        }
    });
});

// /api/cats PUT- updates cat
server.put("/api/cats/:id", (req, res) => {
    Cats.update(req.params.id, req.body)
        .then(cats => {
        if(cats) {
            res.json(cats);
        } else {
            res.status(404).json({ message: 'cats not found' });
        }
    });
});

// server export
module.exports = server;