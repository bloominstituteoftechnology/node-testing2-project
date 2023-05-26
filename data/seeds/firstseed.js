/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('friends').del();
	await knex('friends').insert([
		{ name: 'Enoka' },
		{ name: 'Talha' },
		{ name: 'Amebe' },
		{ name: 'Jeff' },
	]);
};
