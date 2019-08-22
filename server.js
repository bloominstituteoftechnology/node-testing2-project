const express = require("express");

const server = express();

server.use(express.json());

server.get("/superheroes", (req, res) => {});

server.post("/add", (req, res) => {});

server.delete("/remove", (req, res) => {});

module.exports = server;
