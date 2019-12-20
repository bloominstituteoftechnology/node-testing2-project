const db = require('../dataBase/dbConfig')

const { insert, get, remove } = require("./employee-model")

describe('employee model', function() {
    describe('insert()', function() {
        beforeEach(async () => {
            await db('employee').truncate()
    })
    
        it('should add the employee to the database', async function() {
            await insert({ name: "ryan"})

            const users = await db('employee')
            expect(users).toHaveLength(1)
        })
        // it('should delete you', async function() {

        //     const users = await db('employee')
        //     await remove({ name: "ryan"})
        //     expect(users).toHaveLength(0)
        // })
    })

})
