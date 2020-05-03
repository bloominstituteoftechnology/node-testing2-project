const jwt = require("jsonwebtoken");
const secrets = require("./secrets.js");

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const secret = secrets.jwt_secret;
  const options = {
    expiresIn: "30m",
  };

  const token = jwt.sign(payload, secret, options);
  return token;
}

module.exports = generateToken;
