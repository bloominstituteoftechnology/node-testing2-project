const PM = require('./profile-model')

async function validateProfileId (req, res, next) {
    try {
        const { id } = req.params
        const data = await PM.getById(id)
        if(!data) {
            res.status(404).json({
                status: 404,
                message: 'Profile ID is not found'
            })
        } else {
            req.params = data
            next()
        }
    } catch (err) {
        next(err)
    }
}

async function verifyProfile(req, res, next) {
    try {
        const { name, abilities } = req.body
        if (!name || !name.trim()) {
            res.status(400).json({
                status: 400,
                message: 'Name Field is Required'
            })
        } else if (!abilities || !abilities.trim()) {
            res.status(400).json({
                status: 400,
                message: 'Abilities field is Required'
            })
        } else {
            req.name = name.trim()
            req.abilities = abilities.trim()
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    validateProfileId,
    verifyProfile
}