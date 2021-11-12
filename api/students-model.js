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


function getById(id) {
    return db('students')
        .where('student_id', id)
        .first();
}



async function create(student) {
  return await db('students')
    .insert(student)
    .then(([id]) => {
      return getById(id)
    })
}
