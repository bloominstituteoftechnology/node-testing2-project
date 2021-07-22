const db = require('../../data/dbConfig');

const find = () => {
    return db("ipsource");
}

const findByID = async (sourceID) => {
    return await db("ipsource")
        .where({sourceID})
        .first();
}

const create = async (source) => {
    const id = await db("ipsource")
        .insert(source);
    return findByID(id);    
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
