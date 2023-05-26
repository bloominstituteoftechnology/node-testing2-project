const db = require('../../data/dbConfig');

const getAll = async () => {
	return db('friends');
};

const getByID = (id) => {
	return db('friends').where('id', id).first();
};

const insert = async (friend) => {
	return await db('friends')
		.insert(friend)
		.then(([id]) => {
			return db('friends').where('id', id).first();
		});
};
module.exports = {
	getAll,
	getByID,
	insert,
};
