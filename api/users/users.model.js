const db = require("../../database/db-config");

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
}

async function getAll() {
    const result = await db("users") 
    const result2 = result.map(n=> {
        if (n.married) {
            return {...n, married : true}
        } else {
            return {...n, married : false}
        }
    })
    return result2;
}

async function getById(id) {
    const result = await db("users").where("id",id); 
    const result2 = result.map(n=> {
        if (n.married) {
            return {...n, married : true}
        } else {
            return {...n, married : false}
        }
    })
    return result2;
}

async function add(user) {
    const [added] = await db('users').insert(user);
    return await getById(added);
}

async function update(id,user) {
    await db("users").update(user).where("id",id);
    return await getById(id); 
}

async function remove(id) {
    await db("users").where("id",id).del();
    return await getAll();
}