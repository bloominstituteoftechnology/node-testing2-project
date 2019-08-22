exports.up = function(knex) {
	return knex.schema.createTable('users', (users) => {
		users.increments();

		users.text('username', 200).notNullable().unique();
		
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users');
};