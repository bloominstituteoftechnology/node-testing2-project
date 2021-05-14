const express = require("express")
const { find, findById, create, remove } = require("./characters-model")

const router = express.Router()

router.get("/characters", async (req, res, next) => {
	try {
		res.json(await find())
	} catch(err) {
		next(err)
	}
})

router.get("/characters/:id", async (req, res, next) => {
	try {
		const character = await findById(req.params.id)
		if (!character) {
			return res.status(404).json({
				message: "Character not found",
			})
		}

		res.json(character)
	} catch (err) {
		next(err)
	}
})

router.post("/characters", async (req, res, next) => {
	try {
		const character = await create({
			name: req.body.name,
		})

		res.status(201).json(character)
	} catch (err) {
		next(err)
	}
})

router.delete("/characters/:id", async (req, res, next) => {
	try {
		const character = await remove(req.params.id)

		res.status(200).end()
	} catch (err) {
		next(err)
	}
})

module.exports = router