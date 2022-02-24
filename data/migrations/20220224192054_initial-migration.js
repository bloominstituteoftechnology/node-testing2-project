
exports.up = function(knex) {
  return knex.schema.createTable('avengers', tbl => {
		tbl.increments();
		tbl.string('secret_identity', 128).unique().notNullable();
	});
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('avengers');
};
