const express = require('express');
const server = express();
const morgan = require('morgan');

// Configure server here
server.use(express.json())
server.use(morgan('dev'))

const Profile = require('./profile/pro-model')


server.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Welcome to My Fantastic Four Profile',
        time: new Date().toLocaleTimeString(),
    })
}) 

server.get('/profile/', (req, res, next)=>{
    // res.status(200).json({message: "fetching profile"})
    Profile.getAll()
        .then(fan => {
            res.status(200).json(fan)
        })
        .catch(err => {
            next(err)
        })
})

server.get('/profile/:id', (req, res, next)=>{
    // res.status(200).json({message: `fetching fan w/id: ${req.params.id}`})
    Profile.getById(req.params.id)
        .then(fan => {
          if (fan) {
            res.status(200).json(fan)
          } else {
              res.status(404).json({
                  status: 404,
                  message: 'Profile does not exist'
              })
          }
        })
        .catch(err => {
            next(err)
        })
})

server.post('/profile/', (req, res, next)=>{
    // res.status(201).json({message: `add fan: ${req.body}`})
    Profile.add(req.body)
        .then(fan => {
            res.status(201).json(fan)
        })
        .catch(err => {
            next(err)
        })
})

server.delete("/profile/:id", (req, res) => {
    res.end()
});
  
server.put("/profile/:id", (req, res) => {
    res.end()
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
