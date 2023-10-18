const db = require("../../database/db-config");

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
}

async function getAll() {
    return await db("users");
}

async function getById(id) {
    return await db("users").where("id",id).first();
}

async function add(user) {
    const [added] = await db('users').insert(user);
    return await getById(added);
}

async function update(id,user) {
    const [updated] = await db("users").update(user).where("id",id);
    return await getById(updated); 
}

async function remove(id) {
    const [index] = await db("users").where("id",id).del();
    return getById(index);
}