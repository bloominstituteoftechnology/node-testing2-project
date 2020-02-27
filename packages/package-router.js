const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    res.send("hello from packages router");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

router.get("/", async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

router.get("/", async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
