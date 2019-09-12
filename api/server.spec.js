const request = require('supertest')
const db = require('../data/dbConfig.js')
const server = require('./server.js')

describe('server', () => {
  // guarantees the table is cleaned out before any tests run
  beforeEach(async () => {
    await db('dogs').truncate()
  })
 
// cross-env DB_ENV = testing
it('tests are running with DB_ENV set as "testing"', () => {
  expect(process.env.DB_ENV).toBe('testing')
})

// TESTING GET TO '/'
describe('GET /', () => {
  it('returns 200 ok', () => {
    // make a GET request to / on our server
    return request(server)
    .get('/')
    .then(res => {
      expect(res.status).toBe(200)
    })
  })

    // it.skip - to skip the test
    // it.only - only run this test
    it('returns JSON', () => {
      return request(server)
      .get('/')
      .then(res => {
        // check that the type of code is JSON
        // expect(res.type).toBe('application/json')
         expect(res.type).toMatch(/json/)
      })
    })
})


// GET TO /DOGS TEST
describe('GET /dogs', () => {
  it('should return an object', () => {
   return request(server)

   .get('/dogs')
   .then(res => {
      expect(typeof res).toBe('object')
      //expect(Array.isArray(res.body)).toBe(true)
   })
  })
 })


// POST TEST
 describe('POST /dogs', () => {
  it('should insert a dog into the db', async () => {
    // insert one
    //return request(server)
    await request(server)
    .post('/dogs')
    .send({
      name: 'Zorro'
    })
    // check if there is one hobbit in the table
    const dogs = await db('dogs')
    expect(dogs).toHaveLength(1)
    //.then(res => {
    //expect(res.body.length).toBe(1)
    //})
  })


  it('should insert 2 dogs into the db', async () => {
      await request(server)
      .post('/dogs')
      .send([
        {
          name: 'zaur'
        },
        {
          name: 'zaur 2'
        }
       ])
       // check there is one hobbit in the table
      const dogs = await db('dogs')
      expect(dogs).toHaveLength(2)
  })
})



})
