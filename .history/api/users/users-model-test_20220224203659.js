const request = require('supertest')
const db = require('../../data/db-config')
const server = require('../server')
test('it is in correct environment for test', () => {
    expect(process.env.NODE_ENV).toBe('development')
})