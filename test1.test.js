const db = require('./db-config')
const users = require('./data/users/users-model')
const server = require('./data/server')
const request = require('supertest')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })
  beforeEach(async () => {
    await db.seed.run()
  })
  afterAll(async () => {
    await db.destroy()
  })

describe('/users',()=>{
    test('[1] GET /users should return an array of users', async ()=>{
        const res = await request(server).get('/api/users')
        expect(res.body).toHaveLength(2)
    })
    test('[2] GET /users/:id returns 1 result', async()=>{
        const res = await request(server).get('/api/users/1')
        expect(res.body).toBeInstanceOf(Object)
    })
    test('[3] GET /users/:id returns 1 result with matching id', async()=>{
        const res = await request(server).get('/api/users/1')
        expect(res.body.user_id).toEqual(1)
    })
    test('[4] GET /users/:id returns ID not found if bad request', async()=>{
        const res = await request(server).get('/api/users/11')
        expect(res.body.message).toMatch(/could not find id/i)
    })
    test('[5] POST /users returns array with 1 additional length', async()=>{
        await request(server).post('/api/users').send({username:'Testing'})
        const allUsers = await db('users')
        expect(allUsers).toHaveLength(3)
    })
    test('[6] POST /users returns the new user', async()=>{
        const res = await request(server).post('/api/users').send({username:'Testing'})
        expect(res.body).toMatchObject({"user_id": 3, "username":'Testing'})
    })
    test('[7] POST /users has matching username', async()=>{
        const res = await request(server).post('/api/users').send({username:'Testing'})
        expect(res.body).toHaveProperty('username')
        expect(res.body.username).toMatch('Testing')
    })
    test('[8] PUT returns 1 result with matching ID', async()=>{
        const res = await request(server).put('/api/users/1').send({username:'Testing'})
        expect(res.body).toHaveProperty('user_id')
        expect(res.body.user_id).toEqual(1)
    })
    test('[9] PUT returns 1 result with matching body', async()=>{
        const res = await request(server).put('/api/users/1').send({username:'Testing'})
        expect(res.body).toBeInstanceOf(Object)
    })
    test('[10] PUT returns error if id not found', async()=>{
        const res = await request(server).put('/api/users/11').send({username:'Testing'})
        expect(res.body.message).toMatch(/could not find id/i)
    })
})

