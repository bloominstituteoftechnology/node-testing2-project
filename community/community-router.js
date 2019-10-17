const router = require('express').Router();

const Users = require('./community-model.js');

router.get('/', (req, res) => {
  Users.find()
    .then(members => {
      res.json(members);
    })
    .catch(err => res.send(err));
});

module.exports = router;