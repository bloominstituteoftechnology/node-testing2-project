const db = require('../data/config');

const find = () => {
	return db('shelbies');
};

const findById = id => {
	return db('shelbies').where({ id }).first();
};

const create = async shelby => {
	const [id] = await db('shelbies').insert(shelby);

	return findById(id);
};

const nuke = id => {
	return db('shelbies').where({ id }).del();
};

module.exports = {
	find,
	findById,
	create,
	nuke
};
