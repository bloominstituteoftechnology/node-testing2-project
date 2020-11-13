const request = require('supertest')
const server = require('../server')

describe('server.js', () => {
 
    describe('index', () => {
      it('return an OK status code', async () => {
        const expectedStatusCode = 200
        const response = await request(server)
        .get('/')
        expect(response.status)
        .toEqual(expectedStatusCode)})

      it('return a JSON object ', async () => {
        const expectedBody = { api: 'running' }
        const response = await request(server)
        .get('/')

        expect(response.body).toEqual(expectedBody)
      })

      it('return a JSON object ', async () => {
        const response = await request(server)
        .get('/')

        expect(response.type).toEqual('application/json')
      })
    })
  })