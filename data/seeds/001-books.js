exports.seed = function(knex, Promise) {
    return knex('books')
      .truncate()
      .then(function() {
        return knex('books').insert([
          { title: 'Anna Karenina', author: 'Tolstoy', },
          { title: 'The Gulag Archipelago', author: 'Solzhenitsyn', },
          { title: 'The Brothers Karamazov', author: 'Dostoyevsky', },
          { title: 'A Winter Walk, 1843', author: 'Thoreau', },
        ]);
      });
  };