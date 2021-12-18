const db = require("../../db-config")

async function createJoke(joke) {
    const [id] = await db("jokes").insert(joke)
    return db("jokes").where("id", id).first()
}

async function deleteJoke(id) {
    let delJoke = await db('jokes').where({ id }).first()
    await db("jokes").where({ id }).del()
    return delJoke
}

module.exports = { createJoke, deleteJoke }
