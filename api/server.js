const express = require('express')
const db = require('./dogs-model')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' })
})

server.get('/api/dogs', async (req, res) => {
    try {
        const dogs = await db.get()
        if (dogs.length > 0) { return res.status(200).json(dogs) }
        res.status(404).json({ message: 'no dogs' })    
    } catch(e) {
        res.status(500).json({ message: 'db error', })
    }
})

module.exports = server