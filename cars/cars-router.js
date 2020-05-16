const express = require("express");
const Cars = require("./cars-models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await Cars.find());
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const cars = await Cars.create(req.body);
    res.status(201).json(cars);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Cars.remove(req.params.id);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
