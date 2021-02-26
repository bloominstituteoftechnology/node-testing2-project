const express = require("express");

const Breweries = require("./breweries/breweries-model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
});

server.get("/breweries", (req, res) => {
    Breweries.getAll()
      .then(breweries => {
        res.status(200).json(breweries);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  server.get("/breweries/id", (req, res) => {
    res.end()
  });
  
  server.post("/breweries", (req, res) => {
    Breweries.insert(req.body)
      .then(hobbit => {
        res.status(200).json(hobbit);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  server.delete("/breweries/:id", (req, res) => {
    res.end()
  });
  
  server.put("/breweries/:id", (req, res) => {
    res.end()
  });

module.exports = server;