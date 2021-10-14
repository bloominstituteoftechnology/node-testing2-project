
exports.seed = function(knex) {
      // Inserts seed entries
      return knex('users').insert([
        {name: "leo"},
        {name: "gabe"},
        {name: "james"},
      ]);
};
