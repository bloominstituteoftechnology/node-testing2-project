const express = require('express');
const server  = express();

//imports
const authRouter = require('./auth/authRouter');
const usersRouter = require('./users/usersRouter');
const session = require('express-session')
const logger = require('morgan');
const KnexSessionStore = require('connect-session-knex')(session);
//export
module.exports = server;

//session config
const sessionConfig = {
    name:'a-session',
    secret: 'keep it secret keep it safe',
    cookie:{
        maxAge: 60 * 60 * 1000,
        secure: false ,//true in production
        httpOnly: true
    },
    resave: true,
    saveUninitialized: true,
    store: new KnexSessionStore({
        knex: require('../data/dbConfig'),
        table: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 60 * 60 * 1000
    })
}

//middlewares && routers
server.use(express.json(), session(sessionConfig),logger('short'))
server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)

//routes
server.get('/api', (req, res)=>{
    res.status(200).json({message: `Hi, welcome in.`});
});