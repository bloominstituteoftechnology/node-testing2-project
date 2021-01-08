const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js')

function restricted (req, res, next) {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1];
  
    if (token) {
      jwt.verify(token, secrets.jwt_secret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({
            message: 'You shall not pass!',
          })
        } else {
          req.decodedJwt = decodedToken;
          next();
        }
      })
    } else {
      res.status(401).json({
        message: 'token required'
      })
    };
}

module.exports = {restricted};