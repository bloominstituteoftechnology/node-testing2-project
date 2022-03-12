const express = require('express')
const Teams = require('./f1teams/teams-model')

const server = express()

server.use(express.json())

server.get('/f1teams', async (req, res) => {
   Teams.getAll()
   .then(teams => {
       res.status(200).json(teams)
   })
   .catch(err => {
       res.status(500).json({err})
   })
})

server.get('/f1teams/:id', (req, res) => {
    Teams.getById(req.params.id)
    .then(team => {
        res.status(200).json(team)
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
})

server.post('/f1teams', async (req, res) => {
    const newTeam = await Teams.create(req.body)
    res.status(201).json(newTeam)
})

server.delete('/f1teams/:id', async (req, res) => {
    const deleted = await Teams.remove(req.params.id)
    res.status(204).json(deleted)
})

module.exports = server