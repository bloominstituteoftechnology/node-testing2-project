const express = require('express')
const Users = require('./userModel.js')


const router = express.Router()
// const bcrypt = require('bcryptjs')



router.post('/Register', async (req, res) => {
    try {
        const newUser = await Users.addUser(req.body)
        if (newUser) {
            res.status(201).json('New User added')
        } else {
            res.status(404).json('Unable to add new User')
        }
    }
    catch{
        res.status(500).json('Error with Database')
    }
})

router.get('/', async (req, res) => {
    try {
        const found = await Users.getUser()
        if (found) {
            res.status(200).json(found)
        } else {
            res.status(404).json('No user to Display')
        }
    }
    catch {
        res.status(500).json({
            message: 'Error'

        })
    }
})
module.exports = router