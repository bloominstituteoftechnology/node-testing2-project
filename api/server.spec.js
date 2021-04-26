const db = require('../data/db-config.js');
const server = require('./server.js');
const request = require('supertest');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('tokens')
})