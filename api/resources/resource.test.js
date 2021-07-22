const request = require('supertest')
const db = require('../../data/dbConfig')
const server = require('../server')
const Resources = require('./resource_model')

const resource1 = { name: "gaara" }
const resource2 = { name: "kankuro" }
const resource3 = { name: "temari" }

beforeAll(async () => {
   await db.migrate.rollback()
   await db.migrate.latest()
})
beforeEach(async () => {
   await db('resources').truncate()
})
afterAll(async () => {
   await db.destroy()
})

it("correct env variable", () => {
   expect(process.env.DB_ENV).toBe('testing')
})

describe('checking resource model functions', () => {
   describe('creates a resource', () => {
      it('adds a resource to the db', async () => {
         let resource
         await Resources.add(resource1)
         resource = await db("resources")
         expect(resource).toHaveLength(1)
      })
      it('adds the correct resource', async () => {
         let resource
         await Resources.add(resource2)
         resource = await db('resources').first()
         expect(resource).toMatchObject({ name: "kankuro" })
      })
   })
   describe('deletes a resource', () => {
      it('deletes a resource from the db', async () => {
         const [resource_id] = await db('resources').insert(resource1)
         await db('resources').insert(resource2)
         await db('resources').insert(resource3)
         let resource = await db('resources')
         expect(resource).toHaveLength(3)
         await request(server).delete("/api/resources/" + resource_id)
         let newRec = await db('resources')
         expect(newRec).toHaveLength(2)
      })
      it('can show the deleted resource', async () => {
         await db('resources').insert(resource2)
         let deletedRec = await request(server).delete("/api/resources/1")
         expect(deletedRec.body).toMatchObject({ name: "kankuro" })
      })
   })
})

describe('testing router functions', () => {
   describe('post adds to db', () => {
      it('adds to the db', async () => {
         const newRec = await request(server).post('/api/resources').send({name: "rock lee"})
         expect(newRec.status).toBe(201)
      })
   })
})
