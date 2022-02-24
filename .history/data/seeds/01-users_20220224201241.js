exports.seed = function (knex) {
	return knex('users').insert({
		username: 'bob',
		password: '1234',
	});
};
