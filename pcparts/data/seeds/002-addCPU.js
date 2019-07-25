
exports.seed = function(knex) {
  return knex('CPU').del()
    .then(function () {
      return knex('CPU').insert([
        {
          Manufacter: "AMD",
          Model: "Ryzen 5 3600",
          Socket: "AM4",
          ClockSpeed: 3.8,
          Price: 350
        },
        {
          Manufacter: "AMD",
          Model: "Ryzen 5 3900x",
          Socket: "AM4",
          ClockSpeed: 4.5,
          Price: 700
        },
        {
          Manufacter: "Intel",
          Model: "i7 9990k",
          Socket: "AM4",
          ClockSpeed: 4.00,
          Price: 560
        }
      ]);
    });
};
