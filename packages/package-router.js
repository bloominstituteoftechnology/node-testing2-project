const router = require("express").Router();
const db = require("./package-model.js");

router.get("/", async (req, res) => {
  try {
    const packages = await db.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newItem = await db.insert(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const itemToDelete = await db.findBy({ id });
    await db.remove(id);
    res.status(200).json({ msg: `successfully deleted ${itemToDelete.name}` });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
