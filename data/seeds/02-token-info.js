const tokenInfo = [
  {
    token_description: "BAT is an Ethreum token that powers the BRAVE SOftware's blockchain-based digital advertising platform.",
    token_standard: "ERC-20",
    token_address: "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
    token_id: 1
  },
  {
    token_description: "Polygon (MATIC) is an Ethereum token that powers the Polygon Network, a Layer 2 scaling solution for Ethereum.",
    token_standard: "ERC-20",
    token_address: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
    token_id: 2
  },
  {
    token_description: "Uniswap is an Ethereum token that powers Uniswap, an automated liquidity provider that's designed to make it easy to exchange Ethereum (ERC-20) tokens.",
    token_standard: "ERC-20",
    token_address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    token_id: 3
  },
  {
    token_description: "CryptoKitties is one of the world's first blockchain games, allowing users to create 100% verfiably-unique 'Crypto Kitties' hosted on the mainnet.",
    token_standard: "ERC-721",
    token_address: "0x06012c8cf97bead5deae237070f9587f8e7a266d",
    token_id: 4
  },
  {
    token_description: "Teller is an open-source protocol that interacts with consumer data to calculate default risk and offer unsecured crypto-asset loans. Users can supply liquidity to the protocol’s lending pools and earn interest from repaid loans.",
    token_standard: "ERC-721",
    token_address: "0x2ceb85a2402c94305526ab108e7597a102d6c175",
    token_id: 5
  }
];

exports.tokenInfo = tokenInfo;

exports.seed = function(knex) {
  return knex('token_info').insert(tokenInfo)
};
