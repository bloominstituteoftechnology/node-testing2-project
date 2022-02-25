exports.seed = function (knex) {
	return knex('users').insert([
		{ user: 'user1' },
		{ user: 'user2' },
		{ user: 'user3' },
		{ user: 'user4' },
		{ user: 'user5' },
		{ user: 'user6' },
	]);
};
