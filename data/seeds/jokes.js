exports.seed = async function(knex) {
  await knex('jokes').truncate()
    .then(function () {
      return knex('jokes').insert([
        {joke: "What did the Tin Man say when he got run over by a steamroller?", punchline: "Curses! Foil again!"},
        {joke: "How do you make a tissue dance?", punchline: "Put a little boogie in it!"},
        {joke: "What do you get from a pampered cow", punchline: "Spoiled milk"}
      ])
    })
};
