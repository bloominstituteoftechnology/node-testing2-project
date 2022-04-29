const request = require('supertest');
const db = require('../../data/db-config');
const server = require('../server');
const Student = require('./students-model');

const testStudent1 = { student_name: 'Sylvester', age: '7', grade: '2'}
const testStudent2 = { student_name: 'Elmer', age: '10', grade: '4'}


beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async () => {
    await db('students').truncate()
    await db('english_tests').truncate();
})

afterAll(async () => {
    await db.destroy();
})

test('correct env var', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

test('server is up', async () => {
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ api: 'up' })
})

describe('students model functions', () => {
    test('creates a student', async () => {
        let students
        await Student.createStudent(testStudent1)
        students = await db('students')
        expect(students).toHaveLength(1)

        await Student.createStudent(testStudent2)
        students = await db('students')
        expect(students).toHaveLength(2)
    })
    test('created a student with correct name, age, and grade', async () => {
        const student = await Student.createStudent(testStudent1)
        expect(student).toMatchObject({ student_name: 'Sylvester', age: 7, grade: '2' })
    })
})

describe('HTTP API tests', () => {
    test('[DELETE] / - deletes student', async () => {
        const [student_id] = await db('students').insert(testStudent1)
        let student = await db('students').where('student_id', student_id).first()
        expect(student).toBeTruthy();
        await request(server).delete(`/students/1`)
        student = await db('students').where('student_id', student_id).first()
        expect(student).toBeFalsy()
    })
})