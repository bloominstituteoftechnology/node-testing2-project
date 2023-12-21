const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');

const bulbasaur = { name: 'Bulbasaur', level: 6 };
const dratini = { name: 'Dratini', level: 15 };

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('pokemons').truncate();
  });
  afterAll(async () => {
    await db.destroy();
  });

describe('server.js', () => {
    it('should set testing environment', () => {
      expect(process.env.NODE_ENV).toBe('testing');
    });
});

describe('[GET] /api/pokemons', () => {
    it('should return 200 OK', async () => {
        const res = await request(server).get('/api/pokemons');
        expect(res.status).toBe(200);
    });
    it('should return 200 OK using the squad', async () => {
        const res = await request(server).get('/api/pokemons');
        expect(res.status).toBe(200);
    });
    it('should return JSON', async () => {
        const res = await request(server).get('/api/pokemons');
        expect(res.type).toBe('application/json');
    });
    it('responds with empty array if no pokemons', async () => {
        const res = await request(server).get('/api/pokemons');
        expect(res.body).toHaveLength(0);
    });
    it('responds with pokemons if pokemons', async () => {
        await db('pokemons').insert(dratini);
        let res = await request(server).get('/api/pokemons');
        expect(res.body).toHaveLength(1);
        await db('pokemons').insert(bulbasaur);
        res = await request(server).get('/api/pokemons');
        expect(res.body).toHaveLength(2);
        expect(res.body[0]).toMatchObject(dratini);
        expect(res.body[1]).toMatchObject(bulbasaur);
    });
});

describe('[GET] /api/pokemons/:id', () => {
    it('responds with the pokemon with the given id', async () => {
        await db('pokemons').insert(bulbasaur);
        let res = await request(server).get('/api/pokemons/1');
        expect(res.body).toMatchObject(bulbasaur);
    });
    it('responds with a 404 if id not in db', async () => {
        const response = await request(server).get('/api/pokemons/1');
        expect(response.status).toBe(404);
    });
});

describe('[POST] /api/pokemons', () => {
    it('should return 201 OK', async () => {
        const res = await request(server).post('/api/pokemons').send(dratini);
        expect(res.status).toBe(201);
    });
    it('returns the newly added pokemon', async () => {
      const res = await request(server).post('/api/pokemons').send(bulbasaur);
      expect(res.body.id).toBe(1);
      expect(res.body.name).toBe('Bulbasaur');
    });

});





