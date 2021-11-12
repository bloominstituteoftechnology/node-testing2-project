const db = require('../data/dbConfig')

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
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

function update(id, changes) {
    return db('students')
        .where({ student_id: id })
        .update(changes)
        .then(rows => {
            return getById(id);
        });
}

async function remove(id) {
    const removed = await db('students').where('student_id', id).first();
    await db('students').del().where('student_id', id);
    return removed;
}