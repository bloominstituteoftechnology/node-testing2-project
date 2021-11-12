const Stark = require('./starks-model')
const db = require('../../data/db-config')
const {starks} = require('../../data/seeds/01-starks')

test('sanity check', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})
