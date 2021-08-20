const express = require('express');
const helmet = require('helmet');

const server = express()
server.use(helmet());
server.use(express.json()); 
const testRouter = require('./testFolder/testRouter')

server.use('/tests', testRouter)



//code goes here

module.exports = server
