const authRoutes = require('../api/auth/authRouter');
const request = require('supertest');


//Checks testing enviorment.
describe('GET /', ()=>{
    test('has process.env.DB_ENV as "testing" ', ()=>{
        expect(process.env.DB_ENV).toBe('testing');
    })
})