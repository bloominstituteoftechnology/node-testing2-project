const express = require('express');
const Car = require('./cars-model');
const router = express.Router();
const { 
    checkCarId, 
    checkCarPayload, 
    checkVinNumberValid, 
    checkVinNumberUnique 
} = require('./cars-middleware');