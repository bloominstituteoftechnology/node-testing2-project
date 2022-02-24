const db = require('../../data/db-config');

module.exports = {
    get,
    getById,
    insert,
    update,
    remove,
}

function get() {
    return db('shoungs')
}

function getById(id) {
    return db('shoungs').where('id', id).first();
}

async function insert(shoung) {
    const [id] = await db('shoungs').insert(shoung);
    return getById(id);
}

async function update(id, updates) {
    await db('shoungs')
        .update({ name: updates.name, age: updates.age })
        .where('id', id)
    return getById(id);

}

async function remove(id) {
    const result = await getById(id);
    await db('shoungs')
        .where('id', id)
        .del()
    return result;
}