const request = require('supertest')
const server = require('../server')
const db = require('../../data/dbConfig')
const Streamers = require('../streamers/streamer-model')
require('dotenv').config()


beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})


beforeEach(async () => {
    await db('streamers').truncate();
  });


describe('Test streamers', () => {
    test('[1] returns status 200 ok', async () => {
        const res = await request(server).get('/streamers')
        expect(res.status).toBe(200)
    })
    test('[2] streamers get inserted', async () => {
        let result = await Streamers.create({ name: 'GioS', affiliation:'GS' });
        expect(result).toEqual({ name: 'GioS', affiliation:'GS', streamer_id:1 });
        let streamers = await db('streamers');
        expect(streamers).toHaveLength(1);
    })
    test('[3] call the `up` endpoint', async () => {
        const result = await request(server).get('/');
        expect(result.status).toBe(200);
        expect(result.body).toEqual({ api: "up" });
    })
    test('[4] verify we are using the correct environment', ()  => {
        expect(process.env.NODE_ENV).toBe('testing');
    })
    test('[5] the table is empty', async () => {
        const books = await db('streamers');
        expect(books).toHaveLength(0);
    });
    test('[6] multiple books get created', async () => {
        let result = await Streamers.create({
          name: 'Mixer',
          affiliation: 'Ninja',
        });
        expect(result).toEqual({
          name: 'Mixer',
          affiliation: 'Ninja',
          streamer_id: 1,
        });
        let streamer = await db('streamers');
        expect(streamer).toHaveLength(1);
    
        await Streamers.create({
          name: 'Twitch',
          affiliation: "CourageJD",
        });
        let streamers = await db('streamers');
        expect(streamers).toHaveLength(2);
      });
      test('[7] return an object for id', async () => {
        const res = await request(server).get('/streamers/3')
        expect(res.body).toBeInstanceOf(Object)
    })
    test('[8] return an object for all', async () => {
        const res = await request(server).get('/streamers')
        expect(res.body).toBeInstanceOf(Object)
    })
    test('returns status 20 when created', async () => {
        const res = await request(server).post('/streamers').send({name: 'Abdullahi Manila', affiliation:'AM'})
        expect(res.status).toBe(200)
    })
    test('[4] verify we are using the correct PORT', ()  => {
        expect(process.env.PORT).toBe('9000');
    })
})