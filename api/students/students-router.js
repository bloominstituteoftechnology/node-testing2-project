const router = require('express').Router()
const Student = require('./students-model')

// router.get('/', (req, res, next) => {
//     Student.getStudents()
//         .then(students => {
//             res.status(200).json(students)
//         })
//         .catch(next)
// })

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: 'something went wrong inside the recipes router',
        message: err.message,
        stak: err.stack,
    })
})

module.exports = router