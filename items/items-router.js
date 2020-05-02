const router = require('express').Router()

const Items = require('./items-model.js');

router.get('/', (req, res) => {
  Items.find()
    .then((response) =>{
        return (res.status(200).json(response))
    })
    .catch((err) => res.send(err));
}) 
router.post('/' , (req, res) => {
   const postData = req.body;
   Items.add(postData)
   .then((newItem) => {
     res.status(201).json(newItem)
   })
   .catch(() => {
     res.status(500).json({ message: 'Failed to add a new item'})
   })
 })

 router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Items.findById(id)
    .then((item) => {
      if (item) {
        Items.update(changes, id)
          .then((updatedItem) => {
            res.json(updatedItem);
          });
      } else {
        res.status(404).json({ message: 'Could not find item with given id' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Failed to update item' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Items.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find item with given id' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Failed to delete item' });
    });
});
module.exports = router;