
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('favChars').truncate()
  await knex('favChars').insert([
    {name:'vegeta', anime:'dragonball', topTen: true, rank: 1}
  ])
};
