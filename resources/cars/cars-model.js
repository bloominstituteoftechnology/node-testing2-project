const db = require('../../data/dbconfig');




function getCars(){
    return db('cars');
}

function deleteCar(id){
    return db('cars')
        .where({id})
        .del();
}



module.exports = {
    getCars,
    deleteCar
}