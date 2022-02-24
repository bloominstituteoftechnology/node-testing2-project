const router = require("express").Router();

router.get("/", (req, res, next) => {});

router.post("/", (req, res, next) => {});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
