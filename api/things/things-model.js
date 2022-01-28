const db = require('../../data/db-config')

module.exports = {
    getAll,
    addThing,
}

function getAll() {
    return db('things')
}

async function addThing(thing) {
    const thingy = await db('things').insert(thing)
    const result = await db('things').where('id', thingy).first()
    return result
}