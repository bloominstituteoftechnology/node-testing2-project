
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex("hobbits").del()
      .then(function () {
        // Inserts seed entries
        return knex("hobbits").insert([
          {id: 1, colName: "Frodo"},
          {id: 2, colName: "Sam"},
          {id: 3, colName: "Pippin"}
        ]);
      });
  };