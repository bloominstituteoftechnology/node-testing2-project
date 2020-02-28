const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ router: "students" });
});

module.exports = router;