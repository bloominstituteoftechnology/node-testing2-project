exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('pittsburgh penguins')
    .truncate()
    .then(function() {
      return knex('pittsburgh penguins').insert([
        { name: 'Sidney Crosby' },
        { name: 'Evgeni Malkin' },
        { name: 'Kris LeTang' },
        { name: 'Bryan Rust' },
      ]);
    });
};