exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('jokes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('jokes').insert([
        { joke: 'What did the fish say when he swam into a wall?', punchline: 'Dam.' },
        { joke: 'Did you hear about the guy who invented the knock-knock joke?', punchline: 'He won the “no-bell” prize.' },
        { joke: 'What is red and bad for your teeth?', punchline: 'A brick.' }
      ]);
    });
};
