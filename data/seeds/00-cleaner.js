/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const cleaner = require('knex-cleaner')

exports.seed = function(knex){
    return cleaner.clean(knex,{
        mode: 'truncate',
        ignoreTables: ['knex_migrations', 'knex_migrations_lock']
    })
} 
