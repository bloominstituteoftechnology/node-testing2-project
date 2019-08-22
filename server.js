const express = require("express");
const Superheroes = require("./superheroes-model");

const server = express();

server.use(express.json());

server.get("/superheroes", (req, res) => {
  Superheroes.get()
    .then(superheroes => {
      res.status(200).json(superheroes);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error getting the superheroes." });
    });
});

server.post("/add", (req, res) => {
  const superhero = req.body;

  if (!superhero.name || !superhero.superpower) {
    res.status(400).json({
      message: "Please provide the superhero's name and superpower."
    });
  } else {
    Superheroes.add(superhero)
      .then(hero => {
        res.status(201).json(hero);
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "There was an error adding the superhero." });
      });
  }
});

server.delete("/remove", (req, res) => {});

module.exports = server;
