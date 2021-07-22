const db = require('../../data/dbConfig');

const find = async () => {
    return await db("ipsource");
}

const findByID = async (sourceID) => {
    return await db("ipsource")
        .where({sourceID})
        .first();
}

const create = async (source) => {
    return await db("ipsource")
        .insert(source);
}

const remove = async (sourceID) => {
    return await db("ipsource")
        .where({sourceID})
        .del();
}

module.exports = {
    find,
    findByID,
    create,
    remove
}
