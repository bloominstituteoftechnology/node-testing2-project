const Pets = require('./pets-model');
const db = require('../../../data/db-config');

test('it is the correct environment for the tests', () => {
    expect(process.env.DB_ENV).toBe('testing');
});
