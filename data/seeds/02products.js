
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {id: 1, product_name:'cards',product_description:"play with your friends standard deck",price:1},
        {id: 2, product_name:'table',product_description:"table for dining and anything else",price:1},
        {id: 3, product_name:'vase',product_description:"large vase for all of your decor needs",price:1}
      ]);
    });
};
// products
// table.increments("id")
//("product_name")
//("product_description")
//("price")
