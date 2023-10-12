const request = require('supertest')
const server = require('./api/server')
const db = require('./data/db-config')

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

describe('server.js', () => {
    describe('genere route', () => {
        it ('should return an OK status from the genere route', async () => {
            const expectedStatusCode = 200
            const response = await request(server).get('/api/genere/1')

            expect(response.status).toEqual(expectedStatusCode)
        })
        it ('should return status 404 from genere route if route is incorrect', async () => {
            const expectedStatusCode = 404
            const response = await request(server).get('/api/geneer')

            expect(response.status).toEqual(expectedStatusCode)
        })
        it ('should return status 404 from genere route if genere does not exsist', async () => {
            const expectedStatusCode = 404
            const response = await request(server).get('/api/genere/10000')

            expect(response.status).toEqual(expectedStatusCode)
        })
        it ('should return genere_name: Survival', async () => {
            const expectedGenere = { genere_name: "Survival"}
            const response = await request(server).get('/api/genere/3')

            expect(response.body[0].genere_name).toEqual(expectedGenere.genere_name)
        })
        it ('should create a genere_name of Looter Shooter', async () => {
            const expectedGenere = { genere_name: "Looter Shooter"}
            const response = await request(server).post('/api/genere').send({ genere_name: "Looter Shooter" })

            expect(response.body.genere_name).toEqual(expectedGenere.genere_name)
        })
    })
    describe('videogames route', () => {
        it ('should return an OK status from the videogames route', async () => {
            const expectedStatusCode = 200
            const response = await request(server).get('/api/videogames')

            expect(response.status).toEqual(expectedStatusCode)
        })
        it ('should return all videogames', async () => {
            const expectedResult = 3
            const response = await request(server).get('/api/videogames')

            expect(response.body.length).toEqual(expectedResult)
        })
        it ('should return 1 videogame in genere 3', async () => {
            const expectedResult = 1
            const response = await request(server).get('/api/videogames/genere/3')

            expect(response.body.length).toEqual(expectedResult)
        })
        it ('should create Destiny 2 a Looter Shooter', async () => {
            const expectedVideogame = { vg_name: "Destiny 2", vg_year: 2017, vg_rating: 10, genere_name: "Looter Shooter" }
            const response = await request(server).post('/api/videogames').send({ vg_name: "Destiny 2", vg_year: 2017, vg_rating: 10, genere_name: "Looter Shooter" })

            expect(response.body[0].vg_name).toEqual(expectedVideogame.vg_name)
            expect(response.body[0].vg_year).toEqual(expectedVideogame.vg_year)
            expect(response.body[0].vg_rating).toEqual(expectedVideogame.vg_rating)
            expect(response.body[0].genere_name).toEqual(expectedVideogame.genere_name)
        })
        it ('should return an OK status from the videogames route', async () => {
            const expectedStatusCode = 201
            const response = await request(server).post('/api/videogames').send({ vg_name: "Destiny 2", vg_year: 2017, vg_rating: 10, genere_name: "Looter Shooter" })

            expect(response.status).toEqual(expectedStatusCode)
        })
    })
})