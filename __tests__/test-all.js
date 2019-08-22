const request = require('supertest');

const db = require('../data/db-config');
const server = require('../server')


describe('server', () => {
  beforeEach(async () => {
    // guarantees that the table is cleaned out before any of the tests run
    await db('users').truncate();
  });
  // cross-env DB_ENV=testing
  it('tests are running with DB_ENV set as "testing"', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });


  describe('GET /', () => {
    it('should exist', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe('Users Router', () => { 
    describe('GET /api/users', () => {
      it('returns 200 ok', () => {
        return request(server)
          .get('/api/users')
          .set(
            "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6IldlcyBKb25rZSIsImlhdCI6MTU2NjUwOTI3NSwiZXhwIjoxNTY2NTM4MDc1fQ.9J9N3daaaWDJzytHac6mKtF5bluHYT_c4nPoAJNUX-I"
          )//this is the token created when a user logs in since the route is protected
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
    });
  });

  describe('post api/User', () => { 
    describe('post /api/users', () => {
      it('returns 200 ok', () => {
        return request(server)
          .post('/api/auth/register')
          .send({
            "username":"john doe",
            "password":"password",
            "department_id":"1",
            "position_id":"1"
          })
          
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
    });
  });


});

