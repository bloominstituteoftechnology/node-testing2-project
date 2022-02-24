exports.seed = function (knex) {
	return knex('users').insert({
		username: 'JoeBlow',
		password: '1234',
	});
};
