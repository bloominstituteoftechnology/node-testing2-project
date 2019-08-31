
// create all of the db helper methods 
// require the DB
const empDB = require('../data/db_config');

const getAll = () => {
    return empDB('employees');
};

const getById = (id) => {
    return empDB('employees').where({id}).first();
};

const addEmp = async (employee) => {
    try{
         const [id] = await empDB('employees').insert(employee);
          return getById(id);
    }
    catch(err){
        console.log(err);
    }
};


const removeEmp = (id) => {
    return getById(id).delete();
}


module.exports = {
    getAll,
    getById,
    addEmp,
    removeEmp
};