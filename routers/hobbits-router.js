const express = require("express");
const Hobbits = require("./hobbits-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await Hobbits.find());
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const hobbit = await Hobbits.findById(req.params.id);
    if (!hobbit) {
      return res.status(404).json({
        message: "Hobbit not found",
      });
    }

    res.json(hobbit);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const hobbit = await Hobbits.create(req.body);
    res.status(201).json(hobbit);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
