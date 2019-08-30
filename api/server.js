const express = require('express');

const Menu = require('../menu/menuModel.js');
const addRouter = require('./routers')
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/menu', (req, res) => {
 menu.getAll()
    .then(items => {
      res.status(200).json(rows);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.use('/menu/add', addRouter);

module.exports = server;
