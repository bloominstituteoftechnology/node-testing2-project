const db = require('../../data/dbconfig');




function getCars(){
    return db('cars');
}




module.exports = {
    getCars,
}