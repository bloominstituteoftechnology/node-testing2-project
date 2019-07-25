const router = require("express").Router();
const GPU = require("./GPUModel");

router.get("/", async (req, res) => {
  try {
    const result = await GPU.get();
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Whoopsie Daisy da server is running hot like crazy" });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await GPU.insert(req.body);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Whoopsie Daisy da server is running hot like crazy" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await GPU.get(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Whoopsie Daisy da server is running hot like crazy" });
  }
});

module.exports = router;
