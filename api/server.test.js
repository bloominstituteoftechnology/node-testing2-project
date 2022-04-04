const db = require('../data/dbConfig');
const server = require('./server');
const request = require('supertest');

const Model = require('./model');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})
beforeEach(async () => {
    await db('babyNames').truncate();
})
afterAll(async () => {
    await db.destroy();
})

test('sanity check', () => {
    expect(1).toBe(1);
})

test('[GET] /babynames', async () => {
    let result = await Model.findAll();
    expect(result).toHaveLength(0);

    await Model.addName({ name: 'Baker', gender: 'Male'})

    result = await Model.findAll();
    expect(result).toHaveLength(1);
})

describe('Testing GET /api/babynames/:gender', () => {
    it('Tesing for resp with valid input', async () => {
        
    await request(server).post('/api/babynames').send({ name: 'Chris', gender: 'male'})
    await request(server).post('/api/babynames').send({ name: 'Brad', gender: 'male'})
    await request(server).post('/api/babynames').send({ name: 'Andrew', gender: 'male'})
    await request(server).post('/api/babynames').send({ name: 'Tyler', gender: 'male'})
    await request(server).post('/api/babynames').send({ name: 'Katie', gender: 'female'})
    await request(server).post('/api/babynames').send({ name: 'Brenda', gender: 'female'})
    await request(server).post('/api/babynames').send({ name: 'Garret', gender: 'male'})

        const test = await Model.findByGender('male');

        expect(test.length).toBe(5);
    })

    it('testing for correct rest with invalid input', async () => {
        const test = await request(server).get('/api/babynames/boygirl')
        console.log('test: ', test);
        expect(test.body.message).toBe('There are only 2 genders please enter male or female');
    })

    it('testing for correct resp with female input', async () => {
        const test = await request(server).get('api/babynames/female')

        expect(test.length).toBe(2);
    })
})