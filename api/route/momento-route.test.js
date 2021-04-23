const server = require('../server');
const request = require('supertest');

describe("server", () => {
  test('env variable connected', () => {
    expect(process.env.DB_ENV).toBe('testing')
  })


  describe('POST', () => {
    it('responds with json', function(done){
      request(server)
        .post('/api/mori/')
        .send({name: 'john'})
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200)
        .end(function(err,res){
          if(err) return done(err)
          return done()
        })
    })
  })

})