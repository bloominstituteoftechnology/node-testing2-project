const express = require('express')

const {
  handleError,
  checkStudentId,
  checkValidStudent,
} = require('../api/students-middleware')

const Student = require('./students-model') 

const router = express.Router()



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
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkStudentId, checkValidStudent,  (req, res, next) => {
    Student.update(req.params.id, { student_name: req.body.student_name })
        .then(() => {
            return Student.getById(req.params.id);
        })
        .then(user => {
            res.status(200).json(user);
        })
        .catch(next);
});


router.delete('/:id', checkStudentId, async (req, res, next) => {
  try {
    const student = await Student.remove(req.params.id)
    res.json(student)
  } catch (err) {
    next(err)
  }
})



router.use(handleError);
module.exports = router

