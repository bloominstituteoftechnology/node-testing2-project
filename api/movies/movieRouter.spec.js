const request = require('supertest');
const server = require('../server.js');
const db = require('../../data/dbConfig.js');

describe('movieRouter.js', () => {

  beforeEach(async () => {
    await db('movies').truncate();
  });

  describe('POST /movies', () => {
    it('should return json with a 201 http status code', () => {
      return request(server).post('/api/movies')
        .send({ title: "A Dogs Journey", overview: "A movie about a dog." })
        .then(res => {
          expect(res.type).toMatch(/json/i);
          expect(res.status).toEqual(201);
        });
    });
    it('it should return an obj with title and overview', async () => {
      const res = await request(server).post('/api/movies')
        .send({ title: "A Dogs Journey", overview: "A movie about a dog." })

      expect(res.body.title).toBe('A Dogs Journey');
      expect(res.body.overview).toBe('A movie about a dog.');

    });
  });

  describe('DELETE /movies/:id', () => {
    it('should return json with a 200 http status code', async () => {
      await request(server).post('/api/movies')
        .send({ title: "A Dogs Journey", overview: "A movie about a dog." })

      const res = await request(server).del('/api/movies/1');

      expect(res.type).toMatch(/json/i);
      expect(res.status).toEqual(200);
    });
    it('it should return an obj with deleted title and overview', async () => {
      await request(server).post('/api/movies')
        .send({ title: "A Dogs Journey", overview: "A movie about a dog." })

      const res = await request(server).del('/api/movies/1');

      expect(res.body.title).toBe('A Dogs Journey');
      expect(res.body.overview).toBe('A movie about a dog.');

    });
  });
});
