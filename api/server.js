const express = require("express");

const Characters = require("../characters/charactersModel.js")

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ api: "Server is live...", environment: process.env.DB_ENV })
});

server.get("/characters", (req, res) => {
    Characters.getAll()
    .then(characters => {
        res.status(200).json(characters)
    })
    .catch(error => {
        res.status(500).json({error: "cannot GET Characters"})
    })
})

server.get("/:id/characters", (req, res) => {
    const { id } = req.params;

    Characters.findById(id)
    .then(char => {
      if (char) {
        res.json(char);
      } else {
        res.status(404).json({ message: 'Could not find character' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed' });
    });
})

server.post("/characters", (req, res) => {
    const character = req.body;
    Characters.insert(character)
    .then(char => {
        res.status(200).json(char)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: `error`})
    })
})

server.delete('/:id/characters', (req, res) => {
    const { id } = req.params;

    Characters.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find character with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete' });
    });
});


module.exports = server;