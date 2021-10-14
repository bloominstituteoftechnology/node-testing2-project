const express = require("express");
const Crypto = require("./model");
const router = express.Router();

router.get("/", (req, res, next) => {
  Crypto.getAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
