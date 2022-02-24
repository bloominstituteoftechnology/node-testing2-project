const request = require('supertest')
const db

test('it is in correct environment for test', () => {
    expect(process.env.NODE_ENV).toBe('development')
})