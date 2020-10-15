exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          post_title: "Hello World",
          post_category: "Quotes",
          post_author: "Abdinajib",
          rating: 2,
          post_text:  "Let your workings remain a mystery. Just show people the results."
        },
        {
          post_title: "Taco Bell<3",
          post_category: "Food",
          post_author: "AB",
          rating: 5,
          post_text:  "Taco Bell is awesome"
        },
        {
          post_title: "LAKERS NATION BABY",
          post_category: "Basketball",
          post_author: "Lebron James",
          rating: 5,
          post_text:  "Its about damn time I got my respect! #24"
        },
        {
          post_title: "I Hate Redux",
          post_category: "Coding",
          post_author: "React",
          rating: 1,
          post_text:  "React is the best for managing state."
        },
      ]);
    });
};