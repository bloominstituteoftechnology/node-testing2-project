const router = require('express').Router();

// const Users = require('./users-model.js');

router.get('/', (req, res) => {
//   Users.find()
//     .then(members => {
//       res.json(members);
//     })
//     .catch(err => res.send(err));
    res.json('server is working')
});

module.exports = router;