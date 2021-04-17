const db = require('../../data/db-config.js');

function getAll() {
    return db('tokens').select('token_name as Token', 'token_symbol as Symbol')
}

async function getById(id) {
    const tokenData = await db('tokens')
        .select('token_name as Token', 'token_symbol as Symbol')
        .where('token_id', id)
        .first()
    return tokenData;
}

async function findInfo(id) {
    const token = await getById(id);
    const tokenInfo = await db.select('token_description as description', 'token_standard as type', 'token_address as address')
        .from('token_info')
        .where('token_id', id);

    const tokenWInfo = {
        ...token,
        info: tokenInfo
    };

    return tokenWInfo;
}

async function add(token) {
    const response = await db('tokens').insert(token);
    const newToken = await getById(response[0]);

    return newToken;
}

async function addInfo(id, info) {
    const response = await db('token_info').insert(info);
    if (response) {
        console.log(`info with id: ${id} added`)
    } else {
        return
    }
    return response;
}

async function updateTokenInfo(id, info) {
    const response = await db('token_info').where({ token_id: id }).update({ token_description: info }, ['token_description', 'token_id']);

    if (response) {
        console.log(`info with id: ${id} updated`)
    } else {
        return
    }

    return response;
}



module.exports = {
    getAll,
    getById,
    findInfo,
    add,
    addInfo,
    updateTokenInfo,
}