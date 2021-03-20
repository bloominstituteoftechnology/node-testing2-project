const Shelby = require('../api/shelbies-model');

const checkForValidID = async (req, res, next) => {
	const { id } = req.params;
	const shelby = await Shelby.findById(id);
	if (!shelby) {
		return res.status(404).json({
			message: 'Shelby not found.'
		});
	}
	next();
};

module.exports = {
	checkForValidID
};
