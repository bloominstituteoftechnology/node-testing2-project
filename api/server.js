const express = require("express")
const server=express()
const cors = require("cors")
const helmet = require("helmet")
const authRouter=require("./auth/auth-router")
const productsRouter = require("./products/products-router")
server.use(express.json())
server.use(cors())
server.use(helmet())
server.use("/api/auth",authRouter)
server.use("/api/products",productsRouter)
server.use((err, req, res, next) => { // eslint-disable-line
    console.log('', err.message)
    res.status(err.status || 500).json({
      custom: 'something went wrong',
      message: err.message,
      stack: err.stack,
    })
  });

module.exports=server