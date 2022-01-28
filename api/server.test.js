const request = require('supertest')
const server = require('./server')
const db = require('../data/db-config')


beforeAll(async()=> {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async()=> {
    await db.seed.run()
})
afterAll(async () => {
    await db.destroy()
})

describe('GET /users',()=> {
    
    test('Token Invalid Status',async ()=> {
        const res = await request(server).get('/api/users')   
        expect(res.status).toBe(401)
        expect((res)=> {
            res.body.should.equal({message: "Token required"})
        })
        
    })
    test('Token Valid ', async ()=> {
       const  res = await request(server).get('/api/users') 
        .set("Authorization","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJ1c2VybmFtZSI6InN1ZSIsInJvbGVfbmFtZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2NDMzMjExMjUsImV4cCI6MTY0MzQwNzUyNX0.OeIuMxccNxQVO1HU5wT6EeRbVPOjn6uPF8GYiex83qQ")
        expect(res.status).toBe(200)
       
    })
})
describe('Register users',()=>{
    let res
    beforeEach(async ()=> {
         res = await request(server)
        .post('/api/auth/register')
        .send({ username: "foo", password: "1234", role_name:"instructor"})
    })
    test('return a status 201',()=> {
        expect(res.status).toBe(201)
    })
    test('return the new user', ()=> {
        expect(res.body).toMatchObject({user_id:3,username: "foo", role_name:"instructor"})
        expect(res.body).toHaveProperty('user_id','username','role_name')
    })
})
describe('Login Users',()=> {
    test('return a status 200',async()=> {
        const res = await request(server)
        .post('/api/auth/login')
        .send({  username: "sue", password: "1234"})

        expect(res.status).toBe(200)
    })
})