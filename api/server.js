const express = require('express');

const Hobbits = require('./hobbits-model.js')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: "up"})
});

server.get("/hobbits", (req, res) => {
    Hobbits.getAll()
    .then(hobbit => {
        res.status(200).json(hobbit)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

server.post("/hobbits", async(req, res) => {
    if(!req.body.name) return res.status(422).end()
    const hobbit = await Hobbits.insert(req.body)
    res.status(201).json(hobbit)
})

server.get("/hobbits/:id", (req, res) => {
    res.end()
})

server.delete("/hobbits/:id", (req, res) => {
    res.end()
})

module.exports = server