const request = require('supertest');
const db = require('../data/db-config');
const server = require('../server');

it('correct env var', () => {
    expect(process.env.DB_ENV).toBe('testing')
})