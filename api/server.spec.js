const request = require('supertest');

const db = require('../data/dbConfig');
const server = require('./server');


beforeAll( async ()=>{
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async ()=>{
    await db('users').truncate();
})

afterAll(async ()=>{
    await db.destroy();
})
//Checks testing enviorment.
describe('server.js', ()=>{
    test('process.env is set to "Testing"', ()=>{
        expect(process.env.DB_ENV).toBe('testing');
    })

    describe('GET /', ()=>{

        let res;
        beforeEach( async ()=>{
            res = await request(server).get('/api')
        })

        // test('return 200 ok', ()=>{
        // return request(server)
        //     .get('/api').then(res =>{ expect(res.status).toBe(200)})
        // })

        test('return 200 ok async', async ()=>{
            const res = await request(server).get('/api');
            expect(res.status).toBe(200)
        })

        test('return {message: Hi, welcome in.}', async ()=>{
            const res = await request(server).get('/api');
            expect(res.body).toEqual({message: 'Hi, welcome in.'})
        })
    })    

});

