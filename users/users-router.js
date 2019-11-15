const router = require('express').Router();
const db = require('./users-model');

router.get('/', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).send({message: 'Server Error. Unable to fetch users.', error: err}));
});

router.get('/:id', verifyUserId, (req, res) => {
    const id = req.params.id;
    db.findById(id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => res.status(500).send({message: 'Server Error. Unable to fetch user by ID.', error: err}));
  });
  
router.post('/', verifyNewUser, (req, res) => {
    db.add(req.body)
    .then(ids => {
        db.findById(ids[0])
        .then(user => {
            res.status(201).json(user);
        })
    })
    .catch(err => res.status(500).send({message: 'Server Error. Unable to create user.', error: err}));
})

router.delete('/:id', verifyUserId, (req, res) => {
    const id = req.params.id;
    db.remove(id)
    .then(count => {
        res.status(200).json(`${count} record deleted.`);
    })
    .catch(err => res.status(500).send({message: 'Server Error. Unable to remove user.', error: err}));
});

router.put('/:id', verifyUserId, verifyNewUser, (req, res) => {
    const id = req.params.id;
    const update = req.body;
    db.update(update, id)
    .then(count => {
        db.findById(id)
        .then(user => {
            res.status(200).json(user);
        })
    })
    .catch(err => res.status(500).send({message: 'Server Error. Unable to update user.', error: err}));
})

// mw

function verifyUserId(req, res, next) {
    const id = req.params.id;
    db.findById(id)
    .then(user => {
        if (user.length === 0) {
            res.status(404).json({ message: 'User with provided ID does not exist.' })
        } else {
            next();
        }
    })
    .catch( err => res.status(500).json({ message: 'User with provided ID does not exist.', error: err }));

}

function verifyNewUser(req, res, next) {
    const user = req.body;
    !user && res.status(400).json({message: "No information provided."});
    !user.username && res.status(400).json({message: "Please include a username."});
    !user.name && res.status(400).json({message: "Please include a name."});
    !user.age && res.status(400).json({message: "Please include an age."});
    !user.state && res.status(400).json({message: "Please include a state."});
    next();
}

module.exports = router;