// const express = require("express")
// const router = express.Router()
const server = require('../server')
const Stocks = require("./stocks-model");

server.get("/", (req, res) => {
  Stocks.get()
    .then((stock) => {
      res.status(200).json(stock);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.post("/", (req, res) => {
  Stocks.add(req.body)
    .then((stock) => {
      res.status(200).json(stock);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.delete("/:id", (req, res) => {
  Stocks.delete(req.params.id)
    .then((stock) => {
      res.status(204).json(stock);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = server;