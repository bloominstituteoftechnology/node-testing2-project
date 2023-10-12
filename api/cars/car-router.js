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
    .then(car => {
      res.status(200).json(car);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Cars.add(req.body)
    .then((car) => {
      res.status(201).json(car);
    })
    .catch(next)
})

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  await Cars.modify(id, req.body)
    .then((car) => {
      res.status(200).json(car);
    })
    .catch(next)
})

module.exports = router;