const User = require('./users-model')
const db = require('../../data/db-config')

test('[1] NODE_ENV is correct', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })

