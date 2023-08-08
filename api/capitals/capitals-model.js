const db = require('../../data/db-config.js')

async function getAll() {
    return db('capitals')
}

async function getById(id) {
    return db('capitals').where('id', id).first()
}

async function insert(capital) {
   return await db('capitals').insert(capital).then(id => {
        getById(id)
    }
        
    )
  }

module.exports = {
    getAll,
    getById,
    insert
}