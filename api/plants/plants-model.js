const db = require('../../data/db-config')

function getAll() {
    return db('plants')
  }
  
function getById(id) {
    return db('plants').where({ id }).first()
  }
  
async function insert(plant) {
    const [id] = await db('plants')
      .insert(plant, ['id', 'name'])
    return db('plants').where('id', id).first()
  }
  
function remove(id) {
    return db('plants').where('id', id).del()
  }


module.exports = {
    getAll,
    getById,
    insert,
    remove,
  }