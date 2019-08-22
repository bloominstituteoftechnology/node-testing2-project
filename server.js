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

server.post("/superheroes", (req, res) => {
  const superhero = req.body;

  if (!superhero.name || !superhero.superpower) {
    res.status(422).json({
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

server.delete("/superheroes/:id", (req, res) => {
  const { id } = req.params;

  Superheroes.remove(id)
    .then(hero => {
      if (hero) {
        res.status(200).json(hero);
      } else {
        res.status(404).json({
          message: "The superhero with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "The superhero could not be removed." });
    });
});

module.exports = server;
