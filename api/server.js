const express = require('express')
const server = express()
const Routes = require('./authors/model')
server.use(express.json())

server.get('/',(req,res)=>{
    res.status(200).json({data: 'Here is a working API'})
})

server.get('/authors', (req, res) => {
    Routes.find()
      .then((resp) => {
        res.status(200).json({ Data: resp });
      })
      .catch((err) => {
        res.status(500).json({ Message: err.message });
      });
});
server.post('/authors', (req, res) => {
    const author = req.body;
    Routes.insert(author)
      .then((resp) => {
        res.status(201).json({ Data: resp });
      })
      .catch((err) => {
        res.status(500).json({ Message: err.message });
      });
});
server.delete('/authors/:id', (req, res) => {
    const id = req.params.id;
    Routes.remove(id)
      .then((res) => {
        res.status(201).json({ Data: res });
      })
      .catch((err) => {
        res.status(500).json({ Message: err.message });
      });
  });

module.exports = server