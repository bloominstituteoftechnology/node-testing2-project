module.exports = {
    enviornment: process.env.NODE_ENV || 'development'
    , port: process.env.PORT || 5000
    , jwtSecret: process.env.JWT_SECRET || "is it secret? is it safe?"
    ,
}