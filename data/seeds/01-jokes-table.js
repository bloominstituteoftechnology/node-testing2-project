
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('jokes')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('jokes').insert([
        { joke_question: 'Why did the bike fall over?', joke_answer: 'It was two tire.' },
        { joke_question: 'Why did the golfer bring two pairs of pants?', joke_answer: 'In case he got a hole in one.' },
        { joke_question: 'What do you call a snobby criminal going down the stairs?', joke_answer: 'A con descending.' }
      ]);
    });
};
