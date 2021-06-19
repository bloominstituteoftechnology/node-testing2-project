exports.seed = function (knex) {
	return knex("jokes")
		.truncate()
		.then(function () {
			return knex("jokes").insert([
				{
					joke: "What did the Tin Man say when he got run over by a steamroller?",
					punchline: "Curses! Foil again!",
				},
				{
					joke: "How do you make a tissue dance?",
					punchline: "Put a little bookie in it.",
				},
				{
					joke: "What is an astronaut's favorite part of the computer?",
					punchline: "The Spacebar.",
				},
				{
					joke: "What do you get form a pampered cow?",
					punchline: "Spoiled milk",
				},
				{
					joke: "Why is it annoying to eat next to basketball players?",
					punchline: "They dribble all the time",
				},
				{ joke: "The numbers 19 and 20 got into a fight...", punchline: "21" },
			]);
		});
};
