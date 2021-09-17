const flowers = [
  {name: 'lily', description: `Lilium is a genus of herbaceous flowering plants growing from bulbs, all with large prominent flowers. Lilies come in a plethora of colours and types, from exotic-looking stargazer lilies with painted petals speckled in both light and dark dots, to elegant white lilies that sparkle with pure white petals and red stamens. All lilies share a basic, elegant look that comprises large, brilliantly coloured triangular petals that open wide and curl back to reveal delicate stamen in the center of the bloom. Not only are the colours delightful, but the fragrance produced by these flowers can be downright intoxicating
  `},
  {name: 'tulip', description: `Tulips are a genus of spring-blooming perennial herbaceous bulbiferous geophytes. The flowers are usually large, showy and brightly colored, generally red, pink, yellow, or white. They often have a different colored blotch at the base of the tepals, internally.`}
]


exports.seed = function(knex) {
      return knex('flowers').insert(flowers);
};
