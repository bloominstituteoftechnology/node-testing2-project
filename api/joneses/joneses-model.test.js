const db = require('../../data/dbConfig');
const Jones = require('./joneses-model');

test("NODE_ENV is correct", () => {
    expect(process.env.NODE_ENV).toBe("testing");
})