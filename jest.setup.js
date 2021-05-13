const db = require("./data/db-config")

//reset seeds before every test
beforeEach(async () => {
  await db.seed.run()
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
//to disconnect from database and not receive "worker process error"
afterAll(async () => {
  //close connection to the database
  await db.destroy()
})