const Phones = require("./phones-model");

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  Phones.getPhones()
    .then((arr) => {
      res.status(200).json(arr);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.get("/:id", (req, res, next) => {
  Phones.getPhoneById(req.params.id)
    .then((phone) => {
      res.status(200).json(phone);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.post("/", (req, res) => {
  Phones.add(req.body)
    .then((phone) => {
      res.status(201).json(phone);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
