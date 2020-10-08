const authenticate = () => {

    return (req, res, next) => {
        const authError = {
            message: "Invalid credentials."
        };

        try {
            if(!req.session || !req.session.user){
                return res.status(401).json(authError);
            }

            next();
    
       } catch (err) {
            next(err);
       }
    }    
};

module.exports = authenticate;