exports.seed = function (knex) {
  // Deletes ALL existing entries and resets ids
  return knex('best_books')
    .truncate()
    .then(function () {
      return knex('best_books').insert([
        { name: 'To Kill a Mockingbird', author: 'Harper Lee' },
        { name: 'The Lord of the Rings', author: 'J R R Tolkien' },
        { name: 'Pride & Prejudice', author: 'Jane Austen' },
        { name: 'The Lion, the Witch, & the Wardrobe', author: 'C S Lewis' },
      ]);
    });
};
