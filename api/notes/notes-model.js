const db = require('../../data/config');

const get = () => {
    return db.table('notes');
};

const getByID = (id) => {
    return db.table('notes')
        .where('id', id)
        .first();
};

const create = async (data) => {
    const [id] = await db.table('notes')
        .insert(data);

    return getByID(id);
};

const edit = async (noteId, data) => {
    await db.table('notes')
        .where('id', noteId)
        .update(data);

    return getByID(noteId);
};

const remove = (id) => {
    return db.table('notes')
        .where('id', id)
        .delete();
};

module.exports = {
    get,
    getByID,
    create,
    edit,
    remove
};