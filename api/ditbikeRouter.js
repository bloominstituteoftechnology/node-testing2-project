const db = require("../data/db-config");

const express = require("express");
const router = express.Router();

const Dirtbike = require("./dirtbikeModel");

router.get("/", async (req, res) => {
  const dirtbikes = await Dirtbike.getAll();
  res.status(200).json(dirtbikes);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const dirtbike = await Dirtbike.getById(id);

  if (dirtbike) {
    res.status(200).json(dirtbike);
  } else {
    res.status(404).json({ message: "Dirtbike not found" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const existingdirtbike = await db("dirtbikes")
    .where("dirtbike_id", id)
    .first();

  if (!existingdirtbike) {
    return res.status(404).json({ message: "Dirtbike not found" });
  }
  const updatedDirtbike = await Dirtbike.updateDirtbike(id, updates);
  res.status(200).json(updatedDirtbike);
});

router.delete("/:id", async (req, res) => {
  //   const id = req.params.id;
  //   const removeDirtbike = await Dirtbike.deleteDirtbike(id);
  //   res.status(200).json(removeDirtbike);

  const { id } = req.params;

  const deletedDirtbike = await Dirtbike.deleteDirtbike(id);

  if (!deletedDirtbike) {
    return res.status(404).json({ message: "Dirtbike not found" });
  } else {
    res.status(204).json(deletedDirtbike);
  }
});

module.exports = router;
