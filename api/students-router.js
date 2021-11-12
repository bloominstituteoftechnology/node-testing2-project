const express = require('express')

const {
  handleError,
  checkStudentId,
  checkValidStudent,
} = require('../api/students-middleware')

const Student = require('./students-model') 

const router = express.Router()

// function checkId(req, res, next) {
//   next()
// }



router.get('/', async (req, res, next) => {
  try {
    const students = await Student.getAll()
    res.json(students)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkStudentId, async (req, res) => {
    res.json(req.student);
});


router.post('/', checkValidStudent, async (req, res, next) => {
    try {
        res.status(201)
            .json(await Student.create(req.body));
  // try {
  //   const newStudent = await Student.create(req.body)
  //   res.status(201).json(newStudent)
  } catch (err) {
    next(err)
  }
})



router.use(handleError);
module.exports = router

