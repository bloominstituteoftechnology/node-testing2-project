const db = require('../../data/dbConfig.js')

module.exports = {
    insert,
    // update,
    remove,
    getAll,
    getById,
}

function getAll(){
    return db('krustykrew')
}

function getById(id){
    return db('krustykrew').where({id})
    .first()
}

async function insert(krustykrew){
    return db('krustykrew').insert(krustykrew)
    .then(([id]) => {
        return getById(id)
    })
}

// async function update(id, changes){
//     return null
// }

async function remove(id){
    const removeKrewMember = await db("krustykrew").where("id",id).first()
    await db("krustykrew").where("id",id).delete()
    return removeKrewMember
}