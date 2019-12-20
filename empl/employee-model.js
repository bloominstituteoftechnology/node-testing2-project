const db = require('../dataBase/dbConfig')

module.exports = {
    insert,
    get,
    remove,
    findById
  };


// function insert(user) {
//     return db('employee')
//         .insert(user, 'id')
//         .then(ids => {
//             const id = ids[0]
//             return db('employee')
//                 .where({ id })
//                 .first()
//         })
// }

function insert(user) {
    return db('employee')
    .insert(user)
    .then(ids => {
        const [id] = ids
        return findById(id)
    })
}

function get() {
    return db('employee')
}
function findById(id) {
    return db("employee")
      .select("id", "name")
      .where({ id })
      .first();
  }

function remove(id) {
    return db('employee')
    .where('id', id)
    .del();
}

