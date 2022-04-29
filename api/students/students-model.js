const db = require('../../data/db-config')

async function getStudents() {
    const students = await db('students')
    return students
}

async function getTests(id) {
    debugger;
    const tests = await db('students')
        .join('english_tests', 'students.student_id', 'english_tests.student_id')
        .where('students.student_id', id)
        .select('student_name', 'date_time', 'known_alphabet', 'comments')
    return tests
}

async function createStudent(newStudent) {
    const [student_id] = await db('students').insert(newStudent)
    return db('students').where('student_id', student_id).first()
}

async function deleteStudent(id) {
    return db('students').where('student_id', id).del()
}

module.exports = { getStudents, getTests, createStudent, deleteStudent }