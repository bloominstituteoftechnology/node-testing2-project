const bcrypt = require('bcryptjs');
const { BCRYPT_ROUNDS } = require('../../env_connect')

const hash = bcrypt.hashSync('foobar', BCRYPT_ROUNDS)

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('users').insert([
    { username: 'foo', password: hash },
    { username: 'bar', password: hash }
  ])
};
