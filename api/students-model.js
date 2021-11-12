const db = require('../data/dbConfig')

module.exports = {
  getAll,
  getById,
  create
}

async function getAll () {
  const result = await db('students')
  // console.log("getALL----",result)
  return result
}

async function getById(id) {
  const result = await db('students').where('student_id', id).first()
  console.log("getById---", result)
  return result
}

async function create(newStudent) {
  const [id] = await db('students').insert(newStudent)
  const student = await getById(id) // 
  return student
}
