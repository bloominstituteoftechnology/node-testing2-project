const request = require('supertest');
const server = require('./server');
const db = require('../data/db-config');

describe('server.js', () => {
  it('should set up testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('GET /', () => {
    let res = {};

    beforeAll(async () => {
      res = await request(server).get('/');
    });

    it('should return 200', () => {
      expect(res.status).toBe(200);
    });

    it('should return a JSON object', () => {
      expect(res.type).toBe('application/json');
    });

    it('should return {api: "up"}', () => {
      expect(res.body).toEqual({ api: 'up' });
    });
  });

  describe('GET /cubs', () => {
    let res = {};

    beforeAll(async () => {
      res = await request(server).get('/cubs');
    });

    it('should return 200', async () => {
      expect(res.status).toBe(200);
    });

    it('should return an array', async () => {
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /cubs', () => {
    let res = {};

    beforeEach(async () => {
      await db('cubs').truncate();

      res = await request(server).post('/cubs').send({
        name: 'Kris Bryant',
        position: '3B',
        number: 17
      });
    });

    it('should return 201', () => {
      expect(res.status).toBe(201);
    });

    it('should return a JSON object', () => {
      expect(res.type).toBe('application/json');
    });

    it('should return {id: 1, name: "Kris Bryant", position: "3B", number: 17}', () => {
      expect(res.body).toEqual({
        id: 1,
        name: 'Kris Bryant',
        position: '3B',
        number: 17
      });
    });
  });

  describe('DELETE /cubs/:id', () => {
    let id;

    beforeEach(async () => {
      await db('cubs').truncate();
      const res = await request(server).post('/cubs').send({
        name: 'Kris Bryant',
        position: '3B',
        number: 17
      });
    });

    it('should delete the Cub with the specified id', async () => {
      const res = await request(server).delete('/cubs/1');

      expect(res.status).toBe(200);
    });

    it('should return 404 if the specified id does not exist', async () => {
      const res = await request(server).delete('/cubs/240');

      expect(res.status).toBe(404);
    });
  });
});
