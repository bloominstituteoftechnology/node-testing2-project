const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

test('eviroment is testing', () => {
    expect(true).toBe(true)
})