const express = require("express")
const favChars = require("./charactersModel")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		res.json(await favChars.find())
	} catch(err) {
		next(err)
	}
})

router.get("/:id", async (req, res, next) => {
	try {
		const characters = await favChars.findById(req.params.id)
		if (!characters) {
			return res.status(404).json({
				message: "characters not found",
			})
		}

		res.json(characters)
	} catch (err) {
		next(err)
	}
})

router.post("/", async (req, res, next) => {
	try {
		const characters = await favChars.create(req.body)
		res.status(201).json(characters)
	} catch (err) {
		next(err)
	}
})

router.put('/:id', async (req,res,next)=>{
    try{

        const updateChar=await favChars.update(req.params.id,req.body)
        res.json(updateChar)
    }catch(err){
        next(err)
    }
})

router.delete('/:id', async (req,res,next)=>{
    try{    
         await favChars.remove(req.params.id)
            res.status(200).json({message: "I guess they arent one of my favs afterall."})
    }catch(err){next(err)}
})

module.exports = router

