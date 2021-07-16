const express = require("express");
const router = express.Router();

const KrustyKrew = require('./krustykrew-model.js')

router.delete("/:id", async (req, res, next) => {
	KrustyKrew.remove(req.params.id)
	.then(krew =>{
res.status(200).json(krew)
	})
	.catch(next)
});

module.exports = router;