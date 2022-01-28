const request = require('supertest')
const server = require('./server')
const db = require('../data/db-config')
const setCookie = require('set-cookie-parser')
const bcrypt = require('bcryptjs')

beforeAll(async() => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async() => {
    await db.seed.run()
})
afterAll(async() => {
    await db.destroy()
})

it('[0] sanity check', () => {
    expect(true).not.toBe(false)
})

describe('API', () => {
    describe('[GET] /api/users', () => {
        it('[1]Responds with status code [401] if the user is not logged in.', async() => {
            let res = await request(server).get('/api/users')
            expect(res.status).toBe(401)
        })
        it('[2]Gets the users when the user is logged in.', async() => {
            let res = await request(server)
            .post('/api/auth/login')
            .send({username: 'bob', password: '1234'})
            const {chocolatechip} = setCookie.parse(res, {map: true})
            res = await request(server)
            .get('/api/users')
            .set('Cookie', `${chocolatechip.name}=${chocolatechip.value}`)
            expect(res.body).toMatchObject([{user_id: 1, username: 'bob'}])
        }, 750)
    })
    describe('[POST] /api/auth/register', () => {
        it('[3]Successfully creates new user.', async () => {
            await request(server).post('/api/auth/register').send({ username: 'Naruto', password: 'Uzumaki' })
            const naruto = await db('users').where('username', 'Naruto').first()
            expect(naruto).toMatchObject({ username: 'Naruto' })
          }, 750)
          it('[4]Passwords are bycrypted.', async () => {
            await request(server).post('/api/auth/register').send({ username: 'Naruto', password: 'Uzumaki' })
            const naruto = await db('users').where('username', 'Naruto').first()
            expect(bcrypt.compareSync('Uzumaki', naruto.password)).toBeTruthy()
          }, 750)
          it('[5]No cookie is set.', async () => {
            const res = await request(server).post('/api/auth/register').send({ username: 'Naruto', password: 'Uzumaki' })
            const cookies = setCookie.parse(res, { map: true })
            expect(cookies).toEqual({}) // no SET-COOKIE
          }, 750)
          it('[6]Responds with user_id and username', async () => {
            const res = await request(server).post('/api/auth/register').send({ username: 'Naruto', password: 'Uzumaki' })
            expect(res.body).toMatchObject({ user_id: 2, username: 'Naruto' })
          }, 750)
          it('[7]Responds with proper status if username is taken."', async () => {
            const res = await request(server).post('/api/auth/register').send({ username: 'bob', password: '1234' })
            expect(res.status).toBe(422)
          }, 750)
    })
    describe('[POST] /api/auth/login', () => {
        it('[8]Logs in with correct credentials', async () => {
          const res = await request(server).post('/api/auth/login').send({ username: 'bob', password: '1234' })
          expect(res.body.message).toMatch(/welcome bob/i)
        }, 750)
        it('[9]Cookie is set on login.', async () => {
          const res = await request(server).post('/api/auth/login').send({ username: 'bob', password: '1234' })
          const cookies = setCookie.parse(res, { map: true })
          expect(cookies.chocolatechip).toMatchObject({ name: 'chocolatechip' })
        }, 750)
        it('[10]If credentials are incorrect send invalid credentials message.', async () => {
          res = await request(server).post('/api/auth/login').send({ username: 'bob', password: '12345' })
          expect(res.body.message).toMatch(/invalid credentials/i)
        }, 750)
      })
})