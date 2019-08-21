const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const resourceRouter = require('../auth/resources-router.js');
const knexConnection = require('../database/dbConfig.js');

const server = express();

const sessionOptions = {
	name              : 'pandora',
	secret            : process.env.COOKIE_SECRET || 'The Vault', // for encryption
	cookie            : {
		secure   : process.env.COOKIE_SECURE || false, // in production should be true, false for development
		maxAge   : 1000 * 60 * 60 * 24, // how long is the session good for, in milliseconds
		httpOnly : true, // client JS has no access to the cookie
	},
	resave            : false,
	saveUninitialized : true,
	store             : new KnexSessionStore({
		knex          : knexConnection,
		createtable   : true,
		clearInterval : 1000 * 60 * 60, // how long before we clear out expired sessions
	}),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionOptions));

server.use('/api', resourceRouter);

server.get('/', (req, res) => {
	res.json({ api: 'up', session: req.session });
});

module.exports = server;