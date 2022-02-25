exports.up = function (knex) {
	return knex.schema.createTable('users', (users) => {
		users.increments('user_id');

		users.string('user', 128).notNullable().unique();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('users');
};
