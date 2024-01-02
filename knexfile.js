// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/dirtbikes.db3",
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
  testing: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/test.db3",
      migrations: {
        directory: "./data/migrations",
      },
      seeds: {
        directory: "./data/seeds",
      },
    },
  },
};

// exports.up = function (knex) {
//   return knex.schema.createTable("dirtbikes", (tbl) => {
//     tbl.increments("dirtbike_id");
//     tbl.text("brand").notNullable();
//     tbl.integer("size").notNullable();
//     tbl.integer("price").notNullable();
//   });
// };

// exports.down = function (knex) {
//   return knex.schema.dropTableIfExists("dirtbikes");
// };

// exports.seed = function (knex) {
//   // Deletes ALL existing entries
//   return knex("dirtbikes")
//     .del()
//     .then(function () {
//       // Inserts seed entries
//       return knex("dirtbikes").insert([
//         { brand: "honda", size: 250, price: 5000 },
//         { brand: "suzuki", size: 125, price: 3000 },
//         { brand: "yamaha", size: 80, price: 1000 },
//       ]);
//     });
// };
