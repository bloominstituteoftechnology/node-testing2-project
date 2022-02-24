const router = require("express").Router();
const model = require("./players-model");

router.get("/", (req, res, next) => {
  model.get().then((players) => {
    res.status(200).json(players);
  });
});
router.get("/:id", (req, res, next) => {
  model.getById(req.params.id).then((player) => {
    res.status(201).json(player);
  });
});
router.post("/", (req, res, next) => {
  model.addPlayer(req.body).then((player) => {
    res.status(201).json(player);
  });
});
router.put("/:id", (req, res, next) => {
  model.update(req.params.id, req.body).then((player) => {
    res.status(201).json(player);
  });
});
router.delete("/", (req, res, next) => {
  console.log("router is working");
});

module.exports = router;
