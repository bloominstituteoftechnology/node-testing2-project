const Car = require('../api/students-model');

function handleError(err, req, res, next) { //eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    prodMessage: 'something went really wrong!',
    stack: err.stack,
  });
}

// const checkCarId = (req, res, next) => {
//   const { id } = req.params;
//   Car.getById(id)
//   .then(possibleCar => {
//     if (possibleCar) {
//       res.status(200).json(possibleCar);
//       next()
//     } else {
//       next({ status: 404, message: `car with id ${id} is not found`})
//     }
//   })
//   .catch(next)
//   // DO YOUR MAGIC
// }

// const checkCarPayload = (req, res, next) => {
//   // console.log("payload----", res)
//   next()
// }

// async function checkVinNumberValid (req, res, next) {
//   const { vin } = req.body;
//   try {
//     const validVinNumber = await Car.getById(vin);
//     if (!validVinNumber) {
//       next({ status: 400, message: `vin ${vin} is invalid` });
//     } else {
//       next();
//     }
//   } catch (err) {
//     next(err);
//   }
// }

// async function checkVinNumberUnique (req, res, next) {
//   const { vin } = req.body;
//   try {
//     const uniqueVinNumber = await Car.getById(vin);
//     if (!uniqueVinNumber) {
//       next({ status: 400, message: `vin ${vin} already exists` });
//     } else {
//       next();
//     }
//   } catch (err) {
//     next(err);
//   }
// }

module.exports = {
  handleError,
  // checkCarId,
  // checkCarPayload,
  // checkVinNumberValid,
  // checkVinNumberUnique,
}