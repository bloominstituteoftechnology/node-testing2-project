// build your `/api/projects` router here
const router = require("express").Router();

// eslint-disable-next-line no-unused-vars
router.get("/", (req, res, next) => {
  res.json({message: "Your jokes endpoint is working correctly, great job Steven. You are killing it!"})
});


// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  res.status(500).json({
    CustomMessage: "Something went wrong in the Projects database",
    Message: err.message,
    stack: err.stack,
  });
});

module.exports = router;