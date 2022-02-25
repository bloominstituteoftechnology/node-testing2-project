exports.seed = function (knex) {
	return knex('users').insert([
		{ name: 'user1' },
		{ name: 'user2' },
		{ name: 'user3' },
		{ name: 'user4' },
		{ name: 'user5' },
		{ name: 'user6' },
	]);
};
