const router = require('express').Router();

const House = require('./house-modal.js');

const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, role("gryffindor"), (req, res) => {
  House.find()
    .then(house => {
      res.json(house);
    })
    .catch(err => res.send(err));
});

router.get('/:id', restricted, (req, res) => {
  const { id } = req.params;

  House.findById(id)
  .then(house => {
    if (house) {
      res.json(house);
    } else {
      res.status(404).json({ message: 'Could not find house with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get House' });
  });
});

router.delete('/:id', (req, res) => {
  const { id}= req.params;

  House.removeUser(id)
    .then(deleted => {
      if(deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find scheme with given id' });      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete House' });
    });
})


function role(gryffindor) {
  return function(req, res, next) {
    console.log("house", req.house)
    if(req.house && req.house.role && req.house.role.toLowerCase() === gryffindor) {
      next();
    } else {
      res.status(403).json({ message: "Not Gryffindor."})
    }
  }
}

module.exports = router;