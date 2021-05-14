const db = require("../data/config")

function find() {
	return db("hp-characters")
}

function findById(id) {
	return db("hp-characters").where({ id }).first()
}

async function create(data) {
	const [id] = await db("hp-characters").insert(data)
	return findById(id)
}

async function update(id, data) {
	await db("hp-characters").where({ id }).update(data)
	return findById(id)
}

function remove(id) {
	return db("hp-characters").where({ id }).del()
}

module.exports = {
	find,
	findById,
	create,
	update,
	remove,
}