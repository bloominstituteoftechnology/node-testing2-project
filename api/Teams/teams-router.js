const router = require("express").Router();
const Teams = require("./teams-model");

router.get("/", async (req, res, next) => {
  try {
    const allTeams = await Teams.getAll();
    res.status(200).json(allTeams);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newTeam = await Teams.add(req.body);
    res.status(201).json(newTeam);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
