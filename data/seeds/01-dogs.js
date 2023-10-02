
exports.seed = function(knex) {
  return knex('dogs').truncate()
    .then(function () {
      return knex('dogs').insert([
        {'breed': 'mastiff', 'countryOrigin': 'Tibet', 'avgWeightPounds': 200 },
        {'breed': 'labrador', 'countryOrigin': 'United-Kingdom', 'avgWeightPounds': 60 },
        {'breed': 'komondor', 'countryOrigin': 'Hungary', 'avgWeightPounds': 110 },
      ]);
    });
};
