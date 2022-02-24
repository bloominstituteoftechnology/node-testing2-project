const express = require('express');
const server = express();
const helmet = require('helmet')
const morgan = require('morgan');

// Configure server here
server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))

const PM = require('./profile/profile-model')
const mw = require('./profile/profile-middleware')


server.get('/api', (req, res) => {
  res.status(200).json({
      status: 200,
      message: 'Welcome to The Flash Profile',
      time: new Date().toLocaleTimeString(),
  })
})

//[GET ALL]
server.get('/profile/', (req, res, next)=>{
  // res.status(200).json({message: "fetching profile"})
  PM.getAll()
      .then(persona => {
          res.status(200).json(persona)
      })
      .catch(err => {
          next(err)
      })
})

//[GET BY ID]
server.get('/profile/:id', (req, res, next)=>{
  // res.status(200).json({message: `fetching persona w/id: ${req.params.id}`})
  const { id } = req.params
  PM.getById(id)
      .then(persona => {
        if (persona) {
          res.status(200).json(persona)
        } else {
            res.status(404).json({
                status: 404,
                message: 'Profile ID does not exist'
            })
        }
      })
      .catch(err => {
          next(err)
      })
})

//[POST]
server.post('/profile/', (req, res, next)=>{
  // res.status(201).json({message: `add persona: ${req.body}`})
  PM.add(req.body)
      .then(persona => {
          res.status(201).json(persona)
      })
      .catch(err => {
          next(err)
      })
})

//[PUT]
server.put("/profile/:id", mw.validateProfileId, mw.verifyProfile, async (req, res, next) => {
  try {
      const { id } = req.params
      const updateInfo = await PM.update(id, req.body)
          res.status(400).json(updateInfo)
  } catch (err) {
      next(err)
  }
});

//[DELETE]
server.delete("/profile/:id", mw.validateProfileId, async (req, res, next) => {
  try {
      const { id } = req.params
      const removeData = await PM.remove(id)
        res.status(200).json(removeData)
  } catch (err) {
      next(err)
  }
});

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  })

server.use('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'Not Found'
    })
})

module.exports = server;