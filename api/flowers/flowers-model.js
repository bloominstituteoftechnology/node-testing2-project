const db = require('../../data/db-config');

async function get() {
    return await db('flowers')
    .orderby
}

async function add(object) {
    const [id] = await db('flowers').insert(object)
    const flower = await db('flowers')
        .where('id', id)
        .first()
    return flower
}

async function del(id) {
    await db('flowers')
    .delete()
    .where('id', id)
    return await db('flowers')
}



module.exports = {
    get,
    add,
    del
};