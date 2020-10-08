const validateUser = (req, res, next) => {

    if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(400).json({message: 'Must include a username, email and password.'})
    } else {
        next();
    }
  };

  module.exports = validateUser;