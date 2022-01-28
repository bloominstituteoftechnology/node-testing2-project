const express = require('express');
const helmet = require('helmet');
const cors = require('cors')

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors()) // cors() returns a (req, res, nex) => { // stuff and then next() }

server.use('/', (req, res)=>{
    res.send('Unit 4 Week 3 Module 4')
})

server.use((err, req, res, next) => { // eslint-disable-line
    console.log('disaster!')
    res.status(err.status || 500).json({
    message: `The Horror: ${err.message}`,
    })
})

module.exports = server;