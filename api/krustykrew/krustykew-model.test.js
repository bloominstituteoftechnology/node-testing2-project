const db = require('../../data/dbConfig.js')
const KrustyKrew = require('./krustykrew-model.js')

test('sanity test', () =>{
    expect(process.env.DB_ENV).toBe('testing')
})