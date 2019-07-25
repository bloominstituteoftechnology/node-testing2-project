exports.seed = function(knex) {
  return knex("GPU")
    .del()
    .then(function() {
      return knex("GPU").insert([
        {
          Manufacter: "MSI",
          Subvendor: "AMD",
          Model: "RX 5700",
          MemoryCapacity: 8,
          ClockSpeed: 1650,
          Price: 400
        },
        {
          Manufacter: "Sapphire",
          Subvendor: "AMD",
          Model: "RX 5700 XT",
          MemoryCapacity: 8,
          ClockSpeed: 1650,
          Price: 350
        },
        {
          Manufacter: "EVGA",
          Subvendor: "NVIDIA",
          Model: "RTX 2700 Super",
          MemoryCapacity: 8,
          ClockSpeed: 1750,
          Price: 500
        }
      ]);
    });
};
