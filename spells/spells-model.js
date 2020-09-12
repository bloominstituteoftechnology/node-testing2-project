const db = require('../api/config');

function find() {
    return db('spells');
};

function findById(id){
    return db('spells')
        .where({id})
        .first();
};

function findBy(filter){
    return db('spells')
        .where(filter);
};

async function add(spell){
    const [id] = await db('spells').insert(spell);

    return findById(id);
};

async function edit(id, changes){
    return db('spells')
        .where({id})
        .update(changes);
};

async function remove(id){
    return db('spells')
        .where('id', id)
        .del();
};

module.exports = {
    find, 
    findBy,
    findById,
    add,
    edit,
    remove
};