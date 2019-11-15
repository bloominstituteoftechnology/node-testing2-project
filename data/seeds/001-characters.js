exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('characters').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('characters').insert([
        {name: 'Rick', specie: 'Human', quote: 'Ruben’s seen some rough years, Morty. You don’t agree to get a theme park built inside you if your life is going great.'},
        {name: 'Snuffles', specie: 'Dog', quote: 'Tell me, Summer, if a human was born with stumpy legs, would they breed it with another deformed human and put their children on display like the Dachshund?'},
        {name: 'Mr. Meeseeks', specie: 'unknown', quote: 'Having a family doesn’t mean that you stop being an individual. You know the best thing you can do for the people that depend on you? Be honest with them, even if it means setting them free.'},
        {name: 'Morty', specie: 'Human', quote: 'Rick, what about the reality we left behind?'},
        {name: 'Birdperson', specie: 'Bird Person/Cyborg', quote: ' It’s not nonsense at all. In my people’s tongue it means, "I am in great pain, please help me."'}
      ]);
    });
};