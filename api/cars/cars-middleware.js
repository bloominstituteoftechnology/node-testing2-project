const Car = require('./cars-model')

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const car = await Car.getById(req.params.id)
    if (car) {
      req.car = car
      next()
    } else {
      next({ status: 404, message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.vin) return next({
    status: 400,
    message: 'vin is missing'
  })
  if (!req.body.make) return next({
    status: 400,
    message: 'make is missing'
  })
  if (!req.body.model) return next({
    status: 400,
    message: 'model is missing'
  })
  if (!req.body.mileage) return next({
    status: 400,
    message: 'mileage is missing'
  })
  next()
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const exists = await Car.getByVin(req.body.vin)
    if(!exists) {
      next()
    } else {
      next({ status: 400, message: `vin ${req.body.vin} already exists`})
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique
}