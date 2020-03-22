function restrict() {
    const authError = {
        message: "Invalid Credentials!"
    }

    return async(req,res,next) => {
        if(req.session && req.session.user) {
            next()
        }else {
            res.status(400).json(authError)
        }
    }
}

module.exports = restrict;