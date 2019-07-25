const express = require('express');
const server = express();
const carsRouter = require('./resources/cars/cars-router');





server.get('/', (req, res) =>{
    res.send('<h1>Lets see some cars </h1>')
})

server.use('/api/cars', carsRouter);


module.exports = server;