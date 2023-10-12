const db = require('../../data/db-config.js');

function findById(id) {
    return db('genere').where('genere_id', id)
}

async function add({ genere_name }) {
    return db('genere').insert(genere_name)
    .then(([genere_id]) => {
      return db('genere').where('genere_id', genere_id).first()
    })
}

module.exports = {
    findById,
    add,
}