const express = require("express");
const cors = require("cors");
const spellsRouter = require("../spells/spells-router");
const usersRouter = require('../users/users-router');
const authenticate = require('../middleware/authenticate');
const server = express();
const db = require('./config');
const secret = process.env.SECRET || "secret";
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

server.use(cors());
server.use(express.json());
server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: secret,
    store: new KnexSessionStore({
        knex: db,
        createtable: true
    })
}));
server.use("/api/spells", authenticate, spellsRouter);
server.use('/api/auth', usersRouter);

server.get("/", (req, res) => {
	res.json({
		message: "Hello, world",
	})
});

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server;