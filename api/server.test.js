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

  describe('POST /cubs', () => {
    let res = {};

    beforeEach(async () => {
      res = await request(server).post('/cubs').send({
        name: 'Kris Bryant',
        position: '3B',
        number: 17
      });
    });

    it('should return 201 ok', () => {
      expect(res.status).toBe(201);
    });

    it('should return a JSON object', () => {
      expect(res.type).toBe('application/json');
    });

    it('should return {name: "Kris Bryant", position: "3B", number: 17}', () => {
      expect(res.body).toEqual({
        name: 'Kris Bryant',
        position: '3B',
        number: 17
      });
    });
  });

  // describe('DELETE /cubs/:id', () => {
  //   let res = {};
  //   beforeEach();
  // });
});
