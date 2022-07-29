const express = require('express');
const Car = require('./cars-model');
const router = express.Router();

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const deleteCar = await Car.createCar(id)
    res.status(200).json(deleteCar)
})

module.exports = router