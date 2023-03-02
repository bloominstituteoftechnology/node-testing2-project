const db = require('../../data/db-config');

function find() {
    console.log('find db operation under construction');
    return 'find db operation under construction'
};

function findByMake(make) {
    console.log('findByMake db operation under construction');
    return 'findByMake db operation under construction'
};

module.exports = {
    find,
    findByMake,
}