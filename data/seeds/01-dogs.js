exports.seed = function(knex, Promise) {

    return knex('dogs')
      .truncate()
      .then(function() {
        return knex('dogs').insert([
          { name: 'fido' },
          { name: 'jack' },
          { name: 'cassie' },
          { name: 'buddy' },
        ]);
      });
  };