
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Jokes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('Jokes').insert([
        {
          Setup: "I asked a programmer what his New Year's resolution will be", 
          Punchline: "He answered 640 x 480."
        },
        {
          Setup: "Why did the programmer need glasses?", 
          Punchline: "He couldn't C#"
        },
        {
          Setup: "Why do programmers prefer dark mode?", 
          Punchline: "Cause light attracts bugs."
        },
        {
          Setup: "What do programmers do when they're hungry?", 
          Punchline: "They grab a byte."
        },
        {
          Setup: "Why do Assembly programmers have so much free time at school?", 
          Punchline: "They can't have any classes."
        },
        {
          Setup: "Why do programmers hang out together?", 
          Punchline: "Because they are codependent."
        },
        {
          Setup: "What do programmers wear?", 
          Punchline: "Whatever is in the dress code."
        },
        {
          Setup: "What do passionate Indian chefs and functional programmers have in common when they are exhausted?", 
          Punchline: "They curry on."
        },
        {
          Setup: "Why was Harry Potter such a good computer programmer?", 
          Punchline: "Because he spoke python."
        },
        {
          Setup: "My programmer friend said I have a high IQ", 
          Punchline: "He said it's 404."
        },
        {
          Setup: "How does a programmer confuse a mathematician?", 
          Punchline: "x = x + 1"
        },
        {
          Setup: "I used to work as a programmer for auto correct.", 
          Punchline: "Then they fried me for no raisin."
        },
        {
          Setup: "As a programmer you know what really annoys me about plumbers?", 
          Punchline: "They promised me async but they didn't callback."
        }
      ]);
    });
};
