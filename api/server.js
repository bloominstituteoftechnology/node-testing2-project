const express = require("express");

const server = express();

server.use(express.json());

const Coasters = require("./model");


server.get("/api/coasters", (req, res) => {
    Coasters.get()
        .then( coasters => res.json(coasters));
})

server.get("/api/coasters/:id", async (req, res) => {
    let filter = Number(req.params.id) ?
    {coaster_id: req.params.id}:
    {abbrv: req.params.id.toUpperCase()};

    const coaster = await Coasters.getBy(filter);
    res.json(coaster);
})

server.post("/api/coasters/", (req, res) => {
    Coasters.add(req.body)
        .then( newCoaster => res.status(201).json(newCoaster));
})

server.delete("/api/coasters/:coaster_id", (req, res) => {
    Coasters.del(req.params.coaster_id)
        .then( deletedCoaster => res.json(deletedCoaster));
})

server.use("*", (req, res) => {
    res.status(404).json({ message: "There's nothing here!"});
})

module.exports = server;