const Products = require("./products-model")
const checkPayload=(req,res,next)=>{
    const {product_name,product_description,price} = req.body
    if(!product_name||!product_description||!price){
        res.status(400).json({
            message:"please provide a valid payload"
        })}
        else{
            next()
        
    }
}

module.exports={
    checkPayload
}