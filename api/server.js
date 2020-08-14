const express = require("express");

const Legends = require("../legends/legendsModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({
      message: 'Welcome to our Gravity Falls API!'
  });
});

server.get("/legends", (req, res) => {
  Legends.getLegend()
    .then(legends => {
      res.status(200).json(legends);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = server;