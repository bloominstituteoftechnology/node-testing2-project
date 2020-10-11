const express = require('express');

const Hobbits = require("")

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ api: "up"});
});

server.get("/hobbits", (req, rea) => {
    Hobbits.getAll()
    .then(hobbits => {
        res.status(200).json(hobbits);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

module.exports = server;