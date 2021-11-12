const db = require('../../data/db-config')

module.exports = {
	insert,
	update,
	remove,
	getAll,
	getById,
}

function getAll() {
	return db('houses')
}

function getById(id) {
	return db('houses').where('id', id).first()
}

async function insert(house) {
	// return db('hobbits').insert(hobbit, ['id', 'name']) // postgres
	return db('houses').insert(house)
		.then(([id]) => {
			return getById(id)
		})
}

async function update(id, changes) {
	return null
}

function remove(id) {
	return null
}
