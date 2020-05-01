exports.seed = async function(knex) {
	await knex("users").truncate()
	await knex("users").insert([
		{ name: "sam" },
		{ name: "frodo" },
		{ name: "pippin" },
		{ name: "merry" },
	])
}
