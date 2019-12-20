const express = require('express')
const Employee = require('./employee-model')

const router = express.Router()


router.get('/employee', (req, res) => {
    Employee.get()
        .then(emp => {
            res.status(200).json(emp)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get user'})
        })
})
router.post('/employee', (req, res) => {
    const employ = req.body
    Employee.insert(employ)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({message: 'failed to post'})
    })
})

router.delete('/employee/:id', (req, res) => {
    const { id } = req.params;
    Employee.remove(id)
        .then(del => {
            if (del) {
                res.status(200).json({ message: 'You no longer exist'})
            } else {
                res.status(404).json({message: 'COuld not find ID'})
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get rid of you', error})
        })
})

module.exports = router