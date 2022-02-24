exports.seed = function (knex) {
	return knex('users').insert({
		username: 'username',
		password: 'password',
	});
};
