
exports.seed = async function(knex) {

  await knex('shoungs')
    .insert([
      { name: 'yong', age: 43 },
      { name: 'kim', age: 43 },
      { name: 'kiki', age: 5 },
      { name: 'titi', age: 3 },
    ])
};
