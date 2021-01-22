const db = require("../data/dbConfig")

function find() {
	return db("favChars")
}

function findById(id) {
	return db("favChars").where({ id }).first()
}

async function create(data) {
	const [id] = await db("favChars").insert(data)
	return findById(id)
}

async function update(id, data) {
	await db("favChars").where({ id }).update(data)
	return findById(id)
}

function remove(id) {
	return db("favChars").where({ id }).del()
}

module.exports = {
	find,
	findById,
	create,
	update,
	remove,
}