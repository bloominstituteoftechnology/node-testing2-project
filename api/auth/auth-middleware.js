




const restricted = (req, res, next) =>{
    next()
}


const only = role_name => (req, res, next) =>{
    next()
}

const checkUsernameExists = async (req, res, next) => {
    next()
}

const validateRoleName = (req, res, next) => {

}

module.exports = {
    restricted,
    only,
    checkUsernameExists,
    validateRoleName
}