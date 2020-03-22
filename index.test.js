const server  = require('./index');
const supertest = require('supertest');

test("welcome route", async() => {

    const res = await supertest(server).get('/')
    // console.log(res)
    expect(res.status).toBe(200)
    expect(res.type).toBe('text/html')
    expect(res.text).toBe('<h1>It appears to be working my guy</h1>');
    
})

test('create user', async() => {
    const res = await supertest(server).post('/api/auth/register')
    .send({username: 'Birch McGoo', password:'Beans', char_name:"Birch McGoo", str_mod: 2})

    expect(res.statusCode).toBe(409)
    expect(res.type).toBe('application/json')
    
})

test('login user', async() => {
    const res = await supertest(server).post('/api/auth/login')
    .send({username: 'Birch McGoo', password:'Beans'})

    expect(res.statusCode).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.username).toBe("Birch McGoo")
})