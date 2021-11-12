const express = require('express')

const {
  handleError,
  // checkStudentId,
  // checkValidStudent,
} = require('../api/students-middleware')

const Student = require('./students-model') 

const router = express.Router()

// function checkId(req, res, next) {
//   next()
// }



router.get('/', async (req, res, next) => {
  try {
    const students = await Student.getAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

// router.get('/:id', checkStudentId, async (req, res, next) => {
//   try {
//     const data = await Car.getById(req.params.id)
//     res.json(data)
//   } catch (err) {
//     next(err)
//   }
// })

// router.post('/', checkCarPayload, async (req, res, next) => {
//   try {
//     const newCar = await Car.create(req.body)
//     res.status(201).json(newCar)
//   } catch (err) {
//     next(err)
//   }
// })



router.use(handleError);
module.exports = router

