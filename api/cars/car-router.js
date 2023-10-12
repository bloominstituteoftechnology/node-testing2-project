const router = require("express").Router();
const Cars = require("./car-model");




router.get("/", (req, res, next) => {
  Cars.find()
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(next);
});


router.get("/:car_id", (req, res, next) => {
  Cars.findById(req.params.user_id)
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

router.put("/:car_id", (req, res, next) => {
  Cars.modify(req.params.car_id, req.body)
    .then((car) => {
      res.status(200).json(car);
    })
    .catch(next)
})

module.exports = router;