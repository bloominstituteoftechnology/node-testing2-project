const express = require("express");
const Meme = require("./memes/memes-model");
const db = require("../data/dbConfig");

const server = express();

server.use(express.json());

server.get("/memes", (req, res) => {
  res.status(200).json("yeeha");
});

server.post("/memes", async (req, res) => {
  Meme.insert(req.body)
    .then((meme) => {
      res.status(201).json(meme);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.delete("/memes/:id", async (req, res) => {
  const { id } = req.params;
  await Meme.remove(id);
  res.status(200).json("woohoo!");
});

module.exports = server;
