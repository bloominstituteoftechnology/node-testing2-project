const db = require('../../data/db-config')

function getAll(){
    return db('Profile')
}

function getById(id){
    return db('Profile')
        .where('Profile_id', id)
        .first()
}

async function add(persona){
    return db('Profile')
        .insert(persona)
        .then(id => {
            return getById(id)
        })
}

function update(id, changes) {
    return db("Profile")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? getById(id) : null));
}
  
function remove(id) {
    return db("Profile")
    .where("id", id)
    .del();
}

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
}