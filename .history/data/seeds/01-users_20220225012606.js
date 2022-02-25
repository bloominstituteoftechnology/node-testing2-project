exports.seed = function (knex) {
	return knex('users').insert([
		{ user: 'username1' },
		{ user: 'username2' },
		{ user: 'username3' },
		{ user: 'username4' },
		{ user: 'username5' },
		{ user: 'username6' },
	]);
};
