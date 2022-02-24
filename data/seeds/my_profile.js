exports.seed = async function (knex) {
  // Truncating a table deletes ALL existing entries and resets the primary keys
  await knex('profile').truncate()
  await knex('profile').insert([]);
}