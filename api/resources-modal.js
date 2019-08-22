const db = require('../database/dbConfig.js');

module.exports = {
	add,
	find,
	// findBy,
	findById,
	destroy,
};

function find() {
	return db('resources').select('id', 'resource');
}

// function findBy(filter) {
// 	return db('resources').where(filter);
// }

function add(resource) {
	return db('resources').insert(resource).then(ids => {
		const [ id ] = ids;
		return findById(id);
	});
}

function findById(id) {
	return db('resources').where({ id }).first();
}

function destroy(resource) {
	return db('resources').where({ id }).delete(resource);
}
