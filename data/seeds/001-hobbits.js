exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries and resets ids
    return knex('users')
      .truncate()
      .then(function() {
        return knex('users').insert([
          { name: 'dax' },
          { name: 'max' },
          { name: 'fax' },
          { name: 'tax' },
        ]);
      });
  };
  