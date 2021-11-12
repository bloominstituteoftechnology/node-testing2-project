const Students = require('./students-model');
const db = require('../data/dbConfig');
const request = require('supertest');
// const server = require('./server');

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

describe('Student model', () => {
    describe('getAll', () => {
        it('returns all students in the table', async () => {
            const students = await Students.getAll();
            expect(students).toHaveLength(4);
        });
        it('returns the correct student shape', async () => {
            const students = await Students.getAll();
            expect(students[0]).toHaveProperty('student_name', 'Priscila');
            expect(students[1]).toMatchObject({ student_id: 2, student_name: 'Bob' });
        });
    });


    // describe('Students.create', () => {
    //     it('adds a new student to the table', async () => {
    //         const newStudent = { student_id: 5, student_name: 'John' };
    //         await Students.create(newStudent);
    //         const students = await db('students');
    //         expect(students).toHaveLength(5);
    //     });
    //     it('returns the newly created student', async () => {
    //         const student = { student_id: 5, student_name: 'John' };
    //         const newStudent = await Students.create(student);
    //         expect(newStudent).toMatchObject(student);
    //     });
    // });

    // describe('[POST] /students', () => {
    //     test('responds with new student', async () => {
    //         const res = await request(server)
    //         .post('/students').send({ student_name: 'John' })
    //         expect(res.body).toMatchObject({ student_id: 5, student_name: "John" })
    //     })
    //     test('responds with status 201', async () => {
    //         const res = await request(server)
    //         .post('/students').send({ student_name: 'John' })
    //         expect(res.status).toBe(201)
    //     })
    // })

    describe('Students.remove', () => {
        it('removes a student from the table', async () => {
            await Students.remove(1);
            const currentStudents = await db('students');
            expect(currentStudents).toHaveLength(3);
        });
        it('returns the deleted student', async () => {
            const removed = await Students.remove(1);
            expect(removed).toMatchObject({ student_id: 1, student_name: 'Priscila'});
        });
    });
});
