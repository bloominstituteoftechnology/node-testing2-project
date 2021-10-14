const jokes = [
  {
    joke_name: "Clean up kitchen",
    main_joke: "put dishes away, clean counters, and sweep the floor",
    joke_punchline: false,
  },
  {
    joke_name: "Clean up bedroom",
    main_joke: "put clothes in hamper, vaccuum, and make the bed",
    joke_punchline: true,
  },
  {
    joke_name: "Clean up bathroom",
    main_joke: "clean the loo, wipe the counter and sink, clean the shower",
    joke_punchline: false,
  },
];

exports.jokes = jokes;

exports.seed = function (knex) {
  return knex("jokes").insert(jokes);
};
