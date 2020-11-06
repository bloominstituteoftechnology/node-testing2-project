const supertest = require('supertest')
const server = require('../server')
const db = require('../data/config')

describe('vampire integration tests', () => {
    it('gets a list of vamps', async () => {
        const res = await supertest(server).get('/vampires')
    })
}) 