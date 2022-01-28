const db = require("../../data/db-config")

module.exports = {
  add,
  find,
  findById,
  update,
  remove
}

function find() {
  return db("users")    
}

function findById(user_id) {
    return db('users')
    .where({ user_id })
    .first()
}
  
async function add(user) {
    const [id] = await db('users').insert(user)
  return findById(id)
}
  
async function update(id, changes) {
    return null
}
  
function remove(id) {
    return null
}