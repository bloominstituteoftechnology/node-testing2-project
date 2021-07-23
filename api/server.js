const express = require("express");
const dbConfig = require("../data/dbConfig.js");
const server = express();
server.use(express.json());
const Hobbits = require("./hobbits/hobbits-model");

server.post("/hobbits", async (req, res, next) => {
  try {
    res.status(201).json(await Hobbits.insert(req.body));
  } catch (err) {
    next(err);
  }
});

server.delete("/hobbits/:id", async (req, res) => {
  const deletedHobbit = await Hobbits.getById(req.params.id);
  console.log("DELETEDHOBBIT", req.params.id);
  Hobbits.remove(req.params.id)
    .then((res) => {
      console.log("INSIDE.THEN", deletedHobbit);
      res.status(202).json(deletedHobbit);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = server;
