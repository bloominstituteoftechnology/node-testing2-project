exports.seed = function (knex) {
	return knex('users').insert([
		{
		username: 'username1',
		password: 'password1',
	}]);
};
