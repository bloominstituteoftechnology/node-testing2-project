const Movies = require("./movies-model.js"); 
const db = require('../../data/db-config')

test('NODE_ENV is correct', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })