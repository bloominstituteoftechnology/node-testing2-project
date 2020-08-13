const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
  it('should set up testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('GET /', () => {
    let res = {};

    beforeAll(async () => {
      res = await request(server).get('/');
    });

    it('should return 200 ok', () => {
      expect(res.status).toBe(200);
    });

    it('should return a JSON object', () => {
      expect(res.type).toBe('application/json');
    });

    it('should return {api: "up"}', () => {
      expect(res.body).toEqual({ api: 'up' });
    });
  });

  describe('POST /cubs', () => {});
});
