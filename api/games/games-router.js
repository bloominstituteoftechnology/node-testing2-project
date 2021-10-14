const router = require("express").Router();
const Game = require("./games-model")

router.get("/", (req, res, next) => {
   res.json("router");
 });

// router.get("*", (req, res, next) => {
//   res.json("router");
//   next();
// });

module.exports = router;
