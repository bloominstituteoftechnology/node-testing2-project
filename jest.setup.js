const db = require("./data/config")

beforeEach(async () => {
	await db.seed.run()
})

beforeAll(async () => {
	await db.migrate.rollback()
	await db.migrate.latest()
})

afterAll(async () => {
	// close connection to the database
	await db.destroy()
})
