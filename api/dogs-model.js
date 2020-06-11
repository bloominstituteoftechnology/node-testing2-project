const db = require('../data/dbConfig')

module.exports = {
    get,
    add,
    remove
}

function get() {
    return db('dogs')
}

function getById(id) {
    return db('dogs').where({id}).first()
}

function add(dog) {
    return db('dogs').insert(dog).then(() => dog)
}

async function remove(id) {
    const dog = await getById(id)

    const deletedDog = await db('dogs').where({id}).delete()

    if (deletedDog > 0) { return dog }
}