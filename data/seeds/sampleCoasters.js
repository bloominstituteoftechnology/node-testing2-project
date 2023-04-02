
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('coasters').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('coasters').insert([
        { coaster_name: "Steel Vengeance", height: 205, speed: 74},
        { coaster_name: "Millennium Force", height: 310, speed: 93},
        { coaster_name: "Maverick", height: 105, speed: 70},
        { coaster_name: "Kingda Ka", height: 456, speed: 128},
        { coaster_name: "Intimidator 305", height: 305, speed: 90},
        { coaster_name: "Superman: Escape from Krypton", height: 415, speed: 100}
      ]);
    });
};
