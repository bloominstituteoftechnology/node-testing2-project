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
   
    test('return a status 201',async ()=> {
        const res = await request(server)
        .post('/api/auth/register')
        .send({ username: "foo", password: "1234", role_name:"instructor"})
        expect(res.status).toBe(201)
    })
    test('return the new user',async ()=> {
        const res = await request(server)
        .post('/api/auth/register')
        .send({ username: "foo", password: "1234", role_name:"instructor"})
        expect(res.body).toMatchObject({user_id:3,username: "foo", role_name:"instructor"})
        expect(res.body).toHaveProperty('user_id','username','role_name')
    })
    test('response with default role',async()=> {
        const res = await request(server)
        .post('/api/auth/register')
        .send({ username: "bar", password: "1234"})

        expect(res.body).toHaveProperty("role_name","student")
    })
    test('error reponse on invalid role',async()=> {
        const res = await request(server)
        .post('/api/auth/register')
        .send({ 
            username: "bar",
            password: "1234",
            role_name:"13u213io3u21oiu321ou312oi32u213iou312iouio132uoi312uoi2134yui5yui34yui42yui14yiu34ui41341uiy41u2i41uiy412uiy421uiy412iu"
        })

        expect(res.body.message).toBe("Role name can not be longer than 32 chars")
    })
})
describe('Login Users',()=> {
    let res
    beforeEach(async() => {
        res = await request(server)
        .post('/api/auth/login')
        .send({  username: "sue", password: "1234"})
    })
    test('return a status 200',async()=> {
        expect(res.status).toBe(200)
    })
    test('response of login user', () => {
        expect(res.body).toHaveProperty("message")
        expect(res.body).toHaveProperty("token")
    })
    
})
describe('GET /user/id',() => {
    test('returns a status 401 and invalid token message',async()=> {
        const res = await request(server)
        .get(`/api/users/1`)
        .set("Authorization","garbage token")
        expect(res.status).toBe(401)
        expect((res)=> {
            res.body.message = "Token invalid"
        })
    })
    test('returns a status 403 and restriction message',async()=> {
        const res = await request(server)
        .get(`/api/users/1`)
        .set("Authorization","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJ1c2VybmFtZSI6InN1ZSIsInJvbGVfbmFtZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2NDMzNDAwMjMsImV4cCI6MTY0MzQyNjQyM30.zedD3fepHK06AgYokUDIBPnblKRtUJpogaK9GUVbzRg")
        expect(res.status).toBe(403)
        expect((res)=> {
            res.body.message = "This is not for you"
        })
    })
   
})