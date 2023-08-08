const db = require('../../data/db-config.js')

module.exports = {
    addCapital,
    getAll,
    getById,
    
}

async function getAll() {
    return db('capitals')
}

async function getById(id) {
    return db('capitals').where('capital_id', id).first()
}

 async function addCapital(capital) {
   const [id] = await db('capitals').insert(capital)
        return db('capitals').where('capital_id', id).first()
  }

