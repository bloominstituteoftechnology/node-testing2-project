const express = require('express')
const employeeRouter = require('../users/employee-router')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up', environment: process.env.DB_ENV})
})

server.get('/users', (req, res) => {
    employeeRouter.getAll()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})