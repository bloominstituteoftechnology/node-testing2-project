const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const server = express();


const sessionConfig = {
    name: 'Dot',
    secret: 'Kleeg was here',
    cookie: {
        maxAge: 1000 * 1200,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false
}

server.use(cors());
server.use(helmet());
server.use(express.json())
server.use(session(sessionConfig));



server.get('/', (req, res) =>{
    res.send('<h1>It appears to be working my guy</h1>')
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({message: "Something went wrong!"})
})

module.exports = server;