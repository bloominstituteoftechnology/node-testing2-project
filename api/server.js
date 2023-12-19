const express = require("express");

const Teams = require("./teams/teams-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/teams", (req, res) => {
  Teams.getAll()
    .then((teams) => {
      res.status(200).json(teams);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

server.get("/teams/:id", (req, res) => {
  Teams.getById(req.params.id)
    .then((team) => {
      if (team) {
        res.status(200).json(team);
      } else {
        res.status(404).json({ message: "Team not found" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

server.post("/teams", async (req, res) => {
  res.status(201).json(await Teams.add(req.body));
});

module.exports = server;
