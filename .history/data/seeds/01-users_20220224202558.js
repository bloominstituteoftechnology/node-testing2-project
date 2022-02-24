exports.seed = function (knex) {
	return knex('users').insert({
		username: 'Joe ',
		password: '1234',
	});
};
