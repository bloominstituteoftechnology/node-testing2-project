const router = require("express").Router();
const Cars = require("./cars-model");




router.get("/", (req, res, next) => {
  Cars.get()
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(next);
});


router.get("/:id", (req, res, next) => {
  Cars.findById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Cars.add(req.body)
    .then((car) => {
      res.status(200).json(car);
    })
    .catch(next)
})

router.put("/:id", (req, res, next) => {
  Cars.modify(req.params.id, req.body)
    .then((car) => {
      res.status(200).json(car);
    })
    .catch(next)
})

module.exports = router;