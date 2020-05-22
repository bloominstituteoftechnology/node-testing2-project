const bcrypt = require("bcryptjs");
exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const users = [
    {
      username: "John",
      password: bcrypt.hashSync("secretToMyGrave", 10),
      role: 1,
    },
    {
      username: "admin",
      password: bcrypt.hashSync("secretToMyGrave", 10),
      role: 1,
    },
    {
      username: "David",
      password: bcrypt.hashSync("secretToMyGrave", 10),
      role: 2,
    },
    {
      username: "Luis",
      password: bcrypt.hashSync("secretToMyGrave", 10),
      role: 2,
    },
    {
      username: "lambda",
      password: bcrypt.hashSync("secretToMyGrave", 10),
      role: 1,
    },
  ];

  return knex("users").insert(users);
};
