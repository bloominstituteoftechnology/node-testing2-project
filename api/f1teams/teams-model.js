const db = require('../../data/db.Config')


function getAll(){ 
    return db('f1teams')
}

function getById(id){
    return db('f1teams').where('id', id).first()
}
async function create(team){
    const [id] = await db('f1teams').insert(team)
    return getById(id)
}

 function remove(id) {
    return getById(id).del() 
}

module.exports = {
    getAll,
    getById,
    create,
    remove
}