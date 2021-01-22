const express = require("express")
const Animals = require("./animals-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		res.json(await Animals.find())
	} catch(err) {
		next(err)
	}
})

router.get("/:id", async (req, res, next) => {
	try {
		const animal = await Animals.findById(req.params.id)
		if (!animal) {
			return res.status(404).json({
				message: 'Animal not found'
			})
		}

		res.status(200).json(animal)
	} catch(err) {
		next(err)
	}
})

router.post("/", async (req, res, next) => {
	try {
		const newAnimal = await Animals.create(req.body)
		res.status(201).json(newAnimal)
	} catch(err) {
		next(err)
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		await remove(req.params.id)

		res.status(204).end()
	} catch(err) {
		next(err)
	}
})

module.exports = router
