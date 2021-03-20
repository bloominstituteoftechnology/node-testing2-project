exports.seed = async function (knex) {
	await knex('shelbies').truncate();
	await knex('shelbies').insert([
		{ name: 'Thomas Shelby' },
		{ name: 'Arthur Shelby' },
		{ name: 'John Shelby' },
		{ name: 'Finn Shelby' }
	]);
};
