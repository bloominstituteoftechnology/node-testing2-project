const db = require('../data/db-config.js');

module.exports = {
    insert,
    getLegend,
    remove
};

async function insert(legend) {
    const [id] = await db('legends').insert(legend, 'id');

    return db('legends')
        .where({ id })
        .first();
};

function getLegend() {
    return db('legends')
        .select('id as ID', 'character as Character');
};

function remove(id) {
    return db('legends')
        .where({ id })
        .del();
}