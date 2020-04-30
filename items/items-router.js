const router = require('express').Router()

const Items = require('./items-model.js');

router.get('/', (req, res) => {
  Items.find()
    .then((response) =>{
        return (res.status(200).json(response))
    })
    .catch((err) => res.send(err));
}) 

module.exports = router;