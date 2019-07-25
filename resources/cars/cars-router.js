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

router.delete('/', (req, res) =>{
    
});

module.exports = router;