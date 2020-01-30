const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("users")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("users").insert([
				{
					id: 1,
					username: "rodrigograca31",
					department: "engineer",
					password: bcrypt.hashSync("12345")
					// "$2y$12$qSKCbbuqE6vmflmFokrcMuv5t37k0A4UmQC47h6ayhFB77E1d3qGq"
				},
				{
					id: 2,
					username: "emma",
					department: "accounting",
					password: bcrypt.hashSync("12345")
					// "$2y$12$ABTEJ6ACXYhIgrKh6r78TegBBJaGTUzcXhU.wtAeltQ48IGMfrmIq"
				}
			]);
		});
};
