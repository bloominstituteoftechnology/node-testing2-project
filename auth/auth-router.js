const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { jwtSecret } = require('../config/secrets.js')
const House = require('../house/house-modal.js');

router.post('/register', (req, res) => {
  let house = req.body;
  const hash = bcrypt.hashSync(house.password, 10); 
  house.password = hash;

  House.add(house)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { houseName, password } = req.body;

  House.findBy({ houseName })
    .first()
    .then(house => {
      if (house && bcrypt.compareSync(password, house.password)) {

        const token = signToken(house);

        res.status(200).json({ token }); 
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function signToken(house) {
  const payload = {
    house
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, jwtSecret, options);
}
module.exports = router;
