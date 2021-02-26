const db = require('../../data/dbConfig')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}

function getAll() {
    return db('breweries')
  }
  
  function getById(id) {
    return null
  }
  
  async function insert(hobbit) {
    const [id] = await db("breweries")
      .insert(hobbit)
    return db("breweries")
      .where({id})
      .first()  
  }
  
  async function update(id, changes) {
    return db("breweries").update(changes)
      .where({id})
  }
  
  function remove(id) {
    return null
  }