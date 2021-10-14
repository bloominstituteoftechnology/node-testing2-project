const Pet = require('./pets-model');

function validatePet(req, res, next) {
    if (!req.body.name || !req.body.name.trim()) {
        res.status(422).json({ message: 'A name is required' });
    } else {
        next();
    }
}

const checkPetId = async (req, res, next) => {
    try {
        const pet = await Pet.getById(req.params.id);
        if (!pet) {
            next({ status: 404, message: 'not found' });
        } else {
            req.pet = pet;
            next();
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    validatePet,
    checkPetId
};
