
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('coasters').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('coasters').insert([
        { coaster_name: "Steel Vengeance", abbrv: "SV", height: 205, speed: 74 },
        { coaster_name: "Millennium Force", abbrv: "MF", height: 310, speed: 93 },
        { coaster_name: "Maverick", height: 105, speed: 70 },
        { coaster_name: "Kingda Ka", abbrv: "KK", height: 456, speed: 128 },
        { coaster_name: "Intimidator 305", abbrv: "I305", height: 305, speed: 90 },
        { coaster_name: "Superman: Escape from Krypton", abbrv: "SEFK", height: 415, speed: 100 }
      ]);
    });
};
