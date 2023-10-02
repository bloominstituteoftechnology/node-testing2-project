const db = require('../../data/db-config')

function getAll() {
    return db('dogs')
}
function getById(id) {
    return db('dogs').where('id', id).first()
}
async function add(dog) {
    const [dogId] = await db('dogs').insert(dog)
    return getById(dogId)
}
async function remove(id) {
    const dog = await getById(id)
    const deleted = await db('dogs').where('id', id).del()
    return dog
}
async function update(id, changes) {
    const updateDog = await db('dogs').where('id', id).update(changes)
    return getById(updateDog)
}
module.exports = {
    getAll,
    getById,
    remove,
    add,
    update
}