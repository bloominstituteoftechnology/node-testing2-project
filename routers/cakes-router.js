const express = require("express");
const Cakes = require("../models/cakes-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await Cakes.find());
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const cake = await Cakes.findById(req.params.id);
    if (!cake) {
      return res.status(404).json({
        message: "Cake not found",
      });
    }

    res.json(cake);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const cake = await Cakes.create(req.body);
    res.status(201).json(cake);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
