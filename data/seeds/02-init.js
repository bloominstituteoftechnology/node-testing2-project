exports.seed = async function (knex) {
  // 000-cleanup.js already cleaned out all tables

  await knex("roles").insert([{ name: "admin" }, { name: "user" }]);
  await knex("users").insert({
    username: "admin",
    password: "$2a$08$CjOzAqkUXePlNyZCG6TKuubIY.MpjKqOdrV/W3178ah483kyEbeSe", // plain text password is 1234
    role: 1,
  });
};
