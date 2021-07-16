const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig.js')

test('sanity test', () =>{
    expect(process.env.DB_ENV).toBe('testing')
})

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () =>{
    await db('krustykrew').truncate()
    await  db.seed.run()
})
afterAll(async () => {
    await db.destroy()
})
describe('[GET] /', () => {
    it('returns a status 200 OK', async () => {
      const res = await request(server).get('/')
      expect(res.status).toBe(200)
      expect(res.body).toMatchObject({ api: 'up!!' })
      expect(res.body).toMatchSnapshot()
    })
  })
  describe('[POST] /krustykrew', () => {
    it('returns a status 201 CREATED', async () => {
      const res = await request(server).post('/krustykrew').send({ name: 'Plankton' })
      expect(res.status).toBe(201)
    })
    it('returns newly created krusty krew member', async () => {
      const res = await request(server).post('/krustykrew').send({ name: 'Plankton' })
      expect(res.body).toMatchObject({ id: 5, name: 'Plankton' })
    })
  })
  describe('DELETE /krustykrew', () => {
		
		test('returns status 200 upon successful deletion', async () => {
			const res = await request(server).delete(
				'/krustykrew/1'
			);
			expect(res.status).toBe(200);
		});
		test('returns status 400 with invalid id', async () => {
			const res = await request(server).delete(
				'/krustykre/69'
			);
			expect(res.status).toBe(404);
		});
	});