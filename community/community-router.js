const router = require('express').Router();

const Community = require('./community-model.js');

router.get('/', (req, res) => {
  Community.find()
    .then(members => {
      res.json(members);
    })
    .catch(err => res.send(err));
});

router.post('/', (req, res) => {
    const communityData = req.body;
  
    Community.add(communityData)
    .then(scheme => {
      res.status(201).json(scheme);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new scheme' });
    });
  });

router.delete('/:id', (req, res) => {
const { id } = req.params;
Community.findById(id).then(res => {
    deletedItem = res
    return(
    deletedItem
    )
})

Community.remove(id)
.then(deleted => {
    if (deleted) {
    res.json({ removed: deletedItem });
    } else {
    res.status(404).json({ message: 'Could not find scheme with given id' });
    }
})
.catch(err => {
    res.status(500).json({ message: 'Failed to delete scheme' });
});
});


module.exports = router;