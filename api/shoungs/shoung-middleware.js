const db = require('../../data/db-config');

module.exports = {
    async checkUserId(req, res, next) {
        const shoung = await db('shoungs').where('id', req.params.id).first()
        if (shoung) {
            next()
        } else {
            next({ message: `Could not find user with given id`, status: 404})
        }
    }


}