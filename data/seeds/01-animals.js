exports.seed = async function(knex) {
	await knex("animals").truncate()
	await knex("animals").insert([
		{ name: "frog" },
		{ name: "pig" },
		{ name: "cow" },
		{ name: "sheep" },
	])
}
