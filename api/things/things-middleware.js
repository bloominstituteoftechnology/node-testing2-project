
const checkThingPresent = (req, res, next) => {
    const { thing } = req.body
    if(!thing) {
        res.status(400).json({ message: 'Thing name missing!' })
    } else {
        next()
    }
}

module.exports = checkThingPresent