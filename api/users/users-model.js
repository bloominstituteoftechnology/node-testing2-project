const db = require("../../data/db-config")

module.exports = {
    getAll,
    getById,
    add,
    remove,
    getAllIds,
    getAllNames,
    getNamesAsc,
    getNamesDesc,
    getIdsDesc
}

function getAll() {
    return db("users")
}

function getById(id) {
    return db("users").where("id", id).first()
}

async function add(body) {
    const result = await db("users").insert(body)
    return getById(result)
}

async function remove(id) {
    let result = await getById(id)
    await db("users").delete().where("id", id)
    return result
}

async function getAllIds() {
    let result = await db("users").select("id")
    return result
}

async function getAllNames() {
    let result = await db("users").select("name")
    return result
}

async function getNamesAsc() {
    let result = await db("users").select("name").orderBy("name", "asc")
    return result
}

async function getNamesDesc() {
    let result = await db("users").select("name").orderBy("name", "desc")
    return result
}

async function getIdsDesc() {
    let result = await db("users").select("id").orderBy("id", "desc")
    return result
}