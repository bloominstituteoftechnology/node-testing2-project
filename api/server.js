const express = require('express');

const Dogs = require('../dogs/dogsModel.js');

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});


server.get('/dogs', (req, res) => {
  Dogs.getAll()
    .then(dogs => {
      res.status(200).json(dogs);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

  
server.post('/dogs', (req, res) => {
  Dogs.insert(req.body).then(result => {
    res.status(201).json(res)
  }).catch(error => {
    res.status(500).json(error)
  })
})


module.exports = server;
