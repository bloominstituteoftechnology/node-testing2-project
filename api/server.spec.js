const server = require('./server.js')

const db = require('../data/dbConfig.js')
const request = require('supertest')


describe('Server configuration', () => {
    test('Server is running...', async () => {
        const res = await request(server).get('/');
        expect(res.body).toBe('Server is running...')
    })

    test('DB env to testing', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })

})

//Testing End point using supertest
describe('End Points', () => {
    it('GET request', async () => {
        const allUsers = await db('users')
        const res = await request(server).get('/api')
        // console.log(res)
        expect(res.status).toBe(200)
        expect(res.type).toEqual('application/json')
        expect(allUsers).toHaveLength(0)
    })
})

 // beforeEach(async () => {
    //     await db('users').truncate();
    // })