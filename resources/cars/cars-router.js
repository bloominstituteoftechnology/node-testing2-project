const express = require('express');

const router = express.Router();
const Cars = require('./cars-model');


router.use(express.json());



router.get('/', async (req, res) =>{

    const cars = await Cars.getCars();
    if(cars){
        res.status(200).json(cars)
    }else{
        res.status(400).json({message:"please add a car"})
    }
});

router.post('/', (req, res) =>{
    
});

router.delete('/:id', async (req, res) =>{
    const {id} = req.params;
    const remove = await Cars.deleteCar(id);

    if(remove){
        res.status(200).end();
    }else{
        res.status(401).json({message:"did not delete"})
    }
});

module.exports = router;