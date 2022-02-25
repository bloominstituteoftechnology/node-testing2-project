const db = require('../../data/db-config');

function find() {
	return db('users').select('user_id', 'username');
}

function findBy(filter) {
	return db('users').where(filter);
}

function findById(user_id) {
	return db('users')
		.select('user_id', 'username')
		.where('user_id', user_id)
		.first();
}

async function createUser(user) {
	const [id] = await db('users').insert(user);
	//return findById(id);
    return db('users').where('user_id', id).first()
}

async function deleteUser(id) {
	return db('users').where('user_id', id).del()
}

module.exports = {
	find,
	findBy,
	findById,
	createUser,
    deleteUser,
};
