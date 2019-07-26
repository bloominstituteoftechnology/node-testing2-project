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

router.get('/:id', async (req, res) =>{
    const {id} = req.params
    if(id){

        try{
            const car = await Cars.getCarsBy(id);
            res.status(200).json(car)
        }catch(error){  
            res.status(401).json({message:`${error} car doesnt exist`})
        }
    }else{
        
        res.status(500).json({message:"no car reference"})  
    }

});

router.post('/', async (req, res) =>{
    const {make, model, year} = req.body;

    if(!make || !model || !year){
        res.status(400).json({message:"Please add a make, model, and year"})
    }else{
        const [id] = car = await Cars.addCars(req.body);
        const newCar = await Cars.getCarsBy(id);
        res.status(200).json(newCar)
    }
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