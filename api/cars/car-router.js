const router = require("express").Router();
const Cars = require("./cars-model");




router.get("/", (req, res, next) => {
  Cars.get()
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(next);
});


router.get("/:id", async (req, res, next) => {
  const { id } = req.params
 await  Cars.findById(id)
    .then(car => {
      if (!car) {
        next({status: 404, message: "Car not found"})
      }
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

router.put("/:id", (req, res, next) => {
  Cars.modify(req.params.id, req.body)
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch(next);
});



module.exports = router;