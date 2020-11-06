exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('legitdata').del()
    .then(function () {
      // Inserts seed entries
      return knex('legitdata').insert([
        {id: 1, dataValue1: 'this is data', dataValue2: "this is also data"},
        {id: 2, dataValue1: 'this is data (but with id: 2)', dataValue2: "this is also data (but with id: 2)"},
        {id: 3, dataValue1: 'this is data (but its third instance in this table)', dataValue2: "this is also data (but its third instance in this table)"},
      ]);
    });
};