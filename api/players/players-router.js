const router = require("express").Router();
const model = require("./players-model");

router.get("/", (req, res, next) => {
  model.get().then((players) => {
    res.status(200).json(players);
  });
});
router.get("/:id", (req, res, next) => {
  console.log("router is working");
});
router.post("/", (req, res, next) => {
  console.log("router is working");
});
router.put("/:id", (req, res, next) => {
  console.log("router is working");
});
router.delete("/", (req, res, next) => {
  console.log("router is working");
});

module.exports = router;
