
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {make:'Ford', model: 'Mustang', year:2017},
        {make:'Dodge', model: 'Charger', year:2018},
        {make:'Chevrolet', model: 'Camaro', year:2019}
      ]);
    });
};
