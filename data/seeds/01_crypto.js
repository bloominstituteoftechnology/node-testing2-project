exports.seed = function (knex, Promise) {
  return knex("crypto").insert([
    {
      crypto_name: "Bitcoin",
    },
    {
      crypto_name: "Ethereum",
    },
    {
      crypto_name: "Litecoin",
    },
    {
      crypto_name: "Zcash",
    },
    {
      crypto_name: "Cardano",
    },
  ]);
};
