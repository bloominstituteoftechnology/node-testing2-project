const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const secret = process.env.JWT_SECRET || "secretToMyGrave";

    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        console.log(error);
        res.status(401).json({ message: "you cannot pass!" });
      } else {
        req.jwt = decodedToken;

        next();
      }
    });
  } else {
    res
      .status(400)
      .json({ message: "Please provide the authentication information" });
  }
};
