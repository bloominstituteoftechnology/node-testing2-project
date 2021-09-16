const db = require("../../data/db-config")
//Get all phrases
const getAll = () => {
    return db("aphorisms")
}
//Get phrase
const getById =  (id) => {
    return db("aphorisms").where("aphorisms_id", id).first()
}
//Add a phrase
const add = async (resource) => {
    const [id] = await db("aphorisms").insert(resource)
    return db("aphorisms").where("aphorisms_id", id).first()
}
//Delete a phrase
const deletePhrase = async (id) => {
    const delPhrase = await db("aphorisms").where("aphorisms_id", id).first()
    await db("aphorisms").where("aphorisms_id", id).del()
    return delPhrase
}

module.exports = { getAll, getById, add, deletePhrase }