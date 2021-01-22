const db = require("../data/config")

function find() {
	return db("animals")
}

function findById(id) {
	return db("animals").where({ id }).first()
}

async function create(data) {
	const [id] = await db("animals").insert(data)
	return findById(id)
}

async function update(id, data) {
	await db("animals").where({ id }).update(data)
	return findById(id)
}

function remove(id) {
	return db("animals").where({ id }).del()
}

module.exports = {
	find,
	findById,
	create,
	update,
	remove,
}
