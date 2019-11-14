const express = require("express");
const items = require("./itemsRouter");
const server = express();
const items = require("./itemsModel");

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: `welcome to the ITEM` });
});

server.get("/items", (req, res) => {
  items.find().then(item => res.status(200).json({ item }));
});

server.post("/items", (req, res) => {
  items.add(item).then(item => res.status(201).json(item));
});
