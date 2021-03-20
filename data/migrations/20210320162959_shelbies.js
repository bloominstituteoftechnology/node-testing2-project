exports.up = async function (knex) {
	await knex.schema.createTable('shelbies', table => {
		table.increments();
		table.text('name').notNull();
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists('shelbies');
};
