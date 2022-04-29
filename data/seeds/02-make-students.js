const students = [
    { student_name: 'Tom', age: '5', grade: 'kinder'},
    { student_name: 'Jerry', age: '6', grade: '1'},
]

const english_tests = [
    { date_time: new Date(), known_alphabet: "acdelmnrstuv", unknown_alphabet: "bfghijkopqwxyz", comments: "wrote p for q", student_id: "1"},
    { date_time: new Date(), known_alphabet: "abcdefghijklmnop", unknown_alphabet: "qrstuvwxyz", comments: "said y but wouldn't write it", student_id: "2"},
]

exports.seed = async function (knex) {
    await knex('students').insert(students)
    await knex('english_tests').insert(english_tests)
}