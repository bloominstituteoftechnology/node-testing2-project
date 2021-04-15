exports.up = function (knex) {
	return knex.schema.createTable('books', (tbl) => {
		tbl.increments();
		tbl.string('title', 128).notNullable().unique();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('books');
};
