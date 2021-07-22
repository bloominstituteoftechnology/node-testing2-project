const express = require("express");
const router = express.Router();
const Pokemon = require("./pokemon-model");

router.get("/", async (req, res, next) => {
  let x = await Pokemon.getAll();
  res.json(x);
});

router.post("/", async (req, res, next) => {
  let x = await Pokemon.addmon(req.body);
  res.status(201).json(x);
});

router.delete("/:pokemon_id", async (req, res, next) => {
  try {
    let x = await Pokemon.delmon(req.params.pokemon_id);
    if (x !== 0) {
      res.status(200).json({
        message: `Pokemon with ID: ${req.params.pokemon_id} deleted`,
      });
    } else {
        res.status(404).json({message: `Pokemon with ID: ${req.params.pokemon_id} not found.`})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error...");
  }
});

module.exports = router;
