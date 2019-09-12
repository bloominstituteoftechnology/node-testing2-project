const express = require('express');

const Dogs = require('../dogs/dogsModel.js')

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
  Dogs.insert(req.body)
   .then(result => {
    res.status(201).json(result)
  })
  .catch(error => {
    res.status(500).json(error)
  })
})


server.delete('/dogs/:id/', async (req, res) => {
  const { id } = req.params

  try {
    const dog = await Dogs.findById(id)

    if(dog) {
      const dog = await Dogs.remove(id)
      res.status(201).json(dog)
    } else {
      res.status(404).json({ message: 'Could not find a dog with the given id.' })
    }
  } catch(err) {
    res.status(500).json({ message: 'Failed to delete dog'})
  }
})


module.exports = server;
