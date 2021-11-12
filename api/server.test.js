const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');

test('it is the correct environment for the tests', () => {
    expect(process.env.NODE_ENV).toBe('testing');
});

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db.seed.run();
});

afterAll(async () => {
    await db.destroy();
});

describe('[GET] /students', () => {
    it('should return a 200 OK status', async () => {
        const res = await request(server).get('/api/students');
        expect(res.status).toBe(200);
    });
    it('should return JSON', async () => {
        const res = await request(server).get('/api/students');
        expect(res.type).toBe('application/json');
    });
});

describe('[POST] /api/students', () => {
  test('responds with new student', async () => {
      const res = await request(server)
      .post('/api/students').send({ student_name: 'Alexander' })
      expect(res.body).toMatchObject({ student_id: 5, student_name: 'Alexander' })
  })
  test('responds with status 201', async () => {
      const res = await request(server)
      .post('/api/students').send({ student_name: 'Alexander' })
      expect(res.status).toBe(201)
  })
})


describe('[DELETE] /students/:id', () => {
    it('returns with a 200 Accepted status', async () => {
        const res = await request(server).delete('/api/students/1');
        expect(res.status).toBe(200);
    });
    it('deletes an item from the database', async () => {
        await request(server).delete('/api/students/2');
        const currentStudents = await db('students');
        expect(currentStudents).toHaveLength(3);
    });
    it('deletes the CORRECT item from the database', async () => {
        const res = await request(server).delete('/api/students/2');
        expect(res.body).toMatchObject({ student_id: 2, student_name: 'Bob' });
    });
});