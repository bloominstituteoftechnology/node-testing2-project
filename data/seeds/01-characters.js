
exports.seed = function(knex) {
  return knex('legends').insert([
    {
      character: 'Dipper'
    },
    {
      character: 'Mabel'
    },
    {
      character: 'Soos'
    },
    {
      character: 'Gruncle Stan'
    },
    {
      character: 'Uncle Ford'
    },
    {
      character: 'Bill Cipher'
    }
  ]);
};