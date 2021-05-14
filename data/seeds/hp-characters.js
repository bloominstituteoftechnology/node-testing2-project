exports.seed = async function(knex) {
	await knex("hp-characters").truncate()
	await knex("hp-characters").insert([
		{ name: "Harry Potter" },
		{ name: "Hermione Granger" },
		{ name: "Ron Weasley" },
		{ name: "Severus Snape" },
    { name: "Albus Dumbledore" },
	])
}
