const db = require('../../data/db-config')

module.exports = {
  insert,
  update,
  remove,
  getAll,
}

function getAll() {
  return db('jedi')
}


async function insert(jedi) {
  const [id] = await db("jedi")
    .insert(jedi)
  return db("jedi")
    .where({id})
    .first()  
}

async function update(id, changes) {
  return db("jedi").update(changes)
    .where({id})
}

function remove(id) {
  return db("jedi").where(id).del()
}
