const express = require("express");
const router = express.Router();

const KrustyKrew = require('./krustykrew-model.js')

router.delete("/:id", async (req, res) => {
	const id = req.params.id;
	const deleteKrustyKrew = await KrustyKrew.remove(id);
	res.status(200).json(deleteKrustyKrew);
});

module.exports = router;