const db = require('../../data/db-config')

function getAll(){
    return db('Profile')
}

function getById(id){
    return db('Profile')
        .where('Profile_id', id)
        .first()
}

async function add(fan){
    return db('Profile')
        .insert(fan)
        .then(id => {
            return getById(id)
        })
}

async function update(id, changes) {
    return null
  }
  
  function remove(id) {
    return null
  }

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
}
