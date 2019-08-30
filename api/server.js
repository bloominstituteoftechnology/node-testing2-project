const express = require('express');
const db = require('../employees/employees-model');
//require the db helper methods

const server = express();

server.use(express.json());
//normally add router here but for instance sake we will only use the server for this project





module.exports = server;