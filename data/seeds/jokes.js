
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('jokes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('jokes').insert([
        {joke: "what did the Tin Man say when he got run over by a steamroller?", punchline: "curses! Foil again"},
        {joke: "How do you make a tissue dance?", punchline: "put alittle boogie in it"},
        {joke: "What is an astronuant's favorite part of a computer?", punchline: "The SpaceBar"},
        {joke: "what do you get from a pampered cow?", punchline: "spoiled milk"},
        {joke: "why is it annoying to eat next to basketball players?", punchline: "they dribble all the time"},
        {joke: "The numbers 19 and 20 got in to a fight...", punchline: "21"},
      ]);
    });
};
