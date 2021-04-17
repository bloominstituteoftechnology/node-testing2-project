const tokens = [
  {
    token_name: "Basic Attention Token",
    token_symbol: "BAT"
  },
  {
    token_name: "Polygon",
    token_symbol: "MATIC"
  },
  {
    token_name: "UniSwap V.2",
    token_symbol: "UNI"
  },
  {
    token_name: "CryptoKitties",
    token_symbol: "CK"
  },
  {
    token_name: "Teller NFT",
    token_symbol: "TNFT"
  }
];

exports.tokens = tokens;


exports.seed = function(knex) {
  return knex('tokens').insert(tokens)
};
