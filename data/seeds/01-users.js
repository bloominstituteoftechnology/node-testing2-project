exports.seed = function(knex, Promise) {
  return knex('users').insert([
    { username: 'Luke Skywalker' },
    { username: 'Darth Vader' },
    { username: 'Princess Leia' },
    { username: 'Rey Skywalker' },
    { username: 'Obi-Wan Kenobi' },
    { username: 'Anakin Skywalker' },
    { username: 'Yoda' },
    { username: 'Han Solo' },
    { username: 'Chewbacca' },
    { username: 'Fin Man' },
    { username: 'Jar Jar Binks' },
    { username: 'Greedo' },
    { username: 'Mace Windu' },
    { username: 'Boba Fett' },
  ]);
};
