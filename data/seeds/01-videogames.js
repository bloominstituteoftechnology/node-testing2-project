
exports.seed = async function (knex) {
  await knex('videogames').truncate()
  await knex('genere').truncate()
  await knex('genere').insert([
    { genere_name: 'BR' },
    { genere_name: 'MMORPG' },
    { genere_name: 'Survival' },
  ])
  await knex('videogames').insert([
    {
      vg_name: 'Minecraft',
      vg_year: 2009,
      genere_id: 3,
      vg_rating: 10
    },
    {
      vg_name: 'PUBG',
      vg_year: 2017,
      genere_id: 1,
      vg_rating: 8
    },
    {
      vg_name: 'World of Warcraft',
      vg_year: 2004,
      genere_id: 2,
      vg_rating: 9
    },
  ])
}
