exports.seed = async function (knex) {
  await knex("cakes").truncate();
  await knex("cakes").insert([
    { name: "Mint Chocolate Chip", base_flavor: "chocolate" },
    { name: "Triple Chocolate", base_flavor: "chocolate" },
    { name: "Chocolate Chip", base_flavor: "white" },
    { name: "Dulce de Leche", base_flavor: "caramel" },
  ]);
};
