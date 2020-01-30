const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		jwt.verify(
			token,
			process.env.JWT_SECRETE || "thesecret",
			(err, decoded) => {
				if (err) {
					res.status(500).json({ message: "bad token" });
				} else {
					req.decodedToken = decoded;
					next();
				}
			}
		);
	} else {
		res.status(400).json({ message: "no credentials provided" });
	}
};
