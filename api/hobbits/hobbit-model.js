const db = require("../../data/dbConfig.js")


module.exports = {
    find,
    findByID,
    create,
    remove


}

function find() {
    return db('hobbits');
}

function findByID(id) {
    return db('hobbits').where({id}).first();
}

async function create(hobbit) {
    const [id] = await db('hobbits').insert(hobbit);
    return findByID(id)
}

async function remove(id) {
    const count = await db('hobbits').where({id}).del()
    return count
}
