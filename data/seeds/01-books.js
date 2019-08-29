exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("books")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("books").insert([
        { title: "leviathan", author: "thomas hobbes" },
        { title: "the fall of the ottomans", author: "eugene rogan" },
        { title: "the new jim crow", author: "michelle alexander" }
      ]);
    });
};
