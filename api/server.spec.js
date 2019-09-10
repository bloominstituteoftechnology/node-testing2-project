const request = require('supertest')
const db = require('../data/dbConfig.js')
const server = require('./server.js')

describe('server', () => {
  // guarantees the table is cleaned out before any tests run
  beforeEach(async () => {
    await db('dogs').truncate()
  })



})