const router = require("express").Router();
const QuarterBackPosition = require("./quarterbacks-model");

router.get("/", async (req, res, next) => {
  try {
    const allQuarterbacks = await QuarterBackPosition.getAll();
    res.status(200).json(allQuarterbacks);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newQuarterback = await QuarterBackPosition.add(req.body);
    res.status(201).json(newQuarterback);
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
