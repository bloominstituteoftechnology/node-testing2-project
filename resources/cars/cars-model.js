const db = require('../../data/dbconfig');




function getCars(){
    return db('cars');
}

function getCarsBy(id){
    return db('cars')

        .first()
        .where({id}).then(car =>{
                if(car){
                    return car;
                }else{
                    return null
            }
        })
}

function addCars(car){
    return db('cars').insert(car);
}

function deleteCar(id){
    return db('cars')
        .where({id})
        .del();
}



module.exports = {
    getCars,
    deleteCar,
    addCars,
    getCarsBy
}