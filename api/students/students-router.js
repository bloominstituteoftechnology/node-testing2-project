const router = require('express').Router()
const Student = require('./students-model')

router.get('/', (req, res, next) => {
    Student.getStudents()
        .then(students => {
            res.status(200).json(students)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    debugger;
    Student.getTests(req.params.id)
        .then(tests => {
            res.status(200).json(tests)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Student.createStudent(req.body)
        .then(newStudent => {
            res.status(200).json(newStudent)
        })
        .catch(next)
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    const deletedStudent = await Student.deleteStudent(id)
    res.status(200).json(deletedStudent)
})

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: 'something went wrong inside the recipes router',
        message: err.message,
        stak: err.stack,
    })
})

module.exports = router