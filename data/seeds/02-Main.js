const cars = [
  { name: "Toyota" },
  { name: "Yaris" },
  { name: "Lexus" },
  { name: "IS350" },
];

exports.seed = function (knex, Promise) {
  return knex("cars")
    .truncate()
    .then(function () {
      return knex("cars").insert(cars);
    });
};

exports.cars = cars;
