exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('anime_girls').truncate()
  .then(function () {
    return knex('anime_girls').insert([
      {name: 'Rias Gremory'},
      {name: 'Sachi Komine'},
      {name: 'Yukari Akiyama'},
      {name: 'Marin Kitagawa'}
    ])
  })
};
