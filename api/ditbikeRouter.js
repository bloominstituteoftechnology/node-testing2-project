const express = require("express");
const router = express.Router();
const Dirtbike = require("./dirtbikeModel");

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const removeDirtbike = await Dirtbike.deleteDirtbike(id);
  res.status(200).json(removeDirtbike);
});

module.exports = router;
