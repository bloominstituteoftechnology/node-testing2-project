const jwt = require('jsonwebtoken')
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/user-model.js');
const {jwtSecret} = require('../config/secret.js');
const restricted = require('./restricted')

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {

        const token = generateToken(user); // <<<<<<<<<<<

        res.status(200).json({ token }); // <<<<<<<<<<
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/users', restricted, (req, res) => {
  Users.find()
  .then(users => {
    res.json(users)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "failed to get users"})
})
})

function generateToken(user){
  const payload = {
    subject: user.id,
    username: user.username,
  }

  const options = {
    expiresIn:'1d',
  }
  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;