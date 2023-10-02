const db = require('../data/db-config')
const request = require('supertest')
const server = require('./server')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db.seed.run()
})
describe('sanity', () => {
    test('using testing environment',  () => {
        expect(process.env.NODE_ENV).toBe('testing')
    })
    test('[Get] to index returns api running', async () => {
        const result = await request(server).get('/')
        expect(result.body).toMatchObject({api: 'running'})
    })
})
describe('[GET] /dogs', () => {
    test('[GET] returns all dogs', async () => {
        const res = await request(server).get('/api/dogs')
        expect(res.body).toHaveLength(3)
        expect(res.body[0].breed).toBe('mastiff')
    })
})
describe('[GET] getById', () => {
    test('getById/1 returns correct dog object', async () => {
        const res = await request(server).get('/api/dogs/1')
        expect(res.body).toMatchObject({breed: 'mastiff'})
    })
    test('getById/2 returns correct dog object', async () => {
        const res = await request(server).get('/api/dogs/2')
        expect(res.body).toMatchObject({breed: 'labrador'})
    })
    test('getById/3 returns correct dog object', async () => {
        const res = await request(server).get('/api/dogs/3')
        expect(res.body).toMatchObject({breed: 'komondor'})
    })
})
describe('[DELETE]', () => {
    test('delete function removes dog from database', async () => {
        const deleted = await request(server).delete('/api/dogs/1')
        const res = await request(server).get('/api/dogs')
        expect(res.body).toHaveLength(2)
    })
    test('delete function returns deleted dog', async () => {
        const res = await request(server).delete('/api/dogs/1')
        expect(res.body).toMatchObject({breed: 'mastiff'})
    })
})
describe('[POST]', () => {
    test('adds new dog to database', async () => {
        const newDog = {breed: 'chihuahua', countryOrigin: 'Mexico', avgWeightPounds: 5}
        const res = await request(server).post('/api/dogs').send(newDog)
        expect(res.body).toMatchObject({breed: 'chihuahua'})
        expect(await db('dogs')).toHaveLength(4)
    })
})
describe('checkIdValid middleware', () => {
    test('checkIdValid returns correct error message on bad id', async () => {
        const res = await request(server).delete('/api/dogs/4')
        expect(res.body.message).toContain('dog with id 4 not found')
    })
})
describe('checkDogObjectComplete middleware', () => {
    const dog1 = {breed: "", countryOrigin: "Denmark", avgWeightPounds: 68}
    const dog2 = {breed: "Great Dane", countryOrigin: "", avgWeightPounds: 150}
    const dog3 = {breed: "Great Dane", avgWeightPounds: 90}
    test('checkDogObjectComplete returns correct error on missing breed', async () => {
        const res = await request(server).post('/api/dogs').send(dog1)
        expect(res.body.message).toMatch(/new dogs require unique breed/i)
    })
    test('checkDogObjectComplete returns correct error on missing country', async () => {
        const res = await request(server).post('/api/dogs').send(dog2)
        expect(res.body.message).toMatch(/new dogs require unique breed/i)
    })
    test('checkDogObjectComplete returns correct error in incomplete object', async () => {
        const res = await request(server).post('/api/dogs').send(dog3)
        expect(res.body.message).toMatch(/new dogs require unique breed/i)
    })
})
describe('checkBreedUnique middleware', () => {
    const dog = {breed: "Great Dane", countryOrigin: "Germany", avgWeightPounds: 150}
    test('checkBreedUnique throws an error when posting a dog with an existing breed', async () => {
        const insert = await request(server).post('/api/dogs').send(dog) // creating dog
        const res = await request(server).post('/api/dogs').send(dog) // trying to repost dog
        expect(res.body.message).toMatch(/dog breed must be unique/i)
    })
})
describe('[PUT]', () => {
    const dog = {breed: "Great Dane", countryOrigin: "Germany", avgWeightPounds: 150}
    test('put method updates dog in the database', async () => {
        const res = await request(server).put('/api/dogs/1').send(dog)
        expect(res.body).toMatchObject({breed: "Great Dane"})
        const updatedDog = await request(server).get('/api/dogs/1')
        expect(updatedDog.body).toMatchObject({breed: "Great Dane"})
    })
})