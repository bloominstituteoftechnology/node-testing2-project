exports.up = function(knex) {
	return knex.schema.createTable('resources', resources => {
		resources.increments();

		resources.string('resource', 25).notNullable().unique();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('resources');
};
