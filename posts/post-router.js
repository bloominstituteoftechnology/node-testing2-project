// const router = require('express').Router()
// require("dotenv").config()
// const authenticate = require("../auth/auth-middleware")
// const {add,getAll,update,remove} = require("./post-model")


// router.post("/add", authenticate(), async (req,res,next) => {
//     try {
//         if(req.body){
//             const{user_id, post_title, post_category, post_author, rating, post_text} = req.body
//             const post = {
//                 user_id,
//                 post_title,
//                 post_category,
//                 post_author,
//                 rating,
//                 post_text
//       }
//       await add(post)
//       res.status(201).json({message: "post added"})
//         }
//     } catch(err) {
//         next(err)
//     }
// })

// router.get("/all", authenticate(), async (req,res,next) => {
//     try {
//         const posts = await getAll()
//         res.status(200).json(posts)
//     } catch(err){
//         next(err)
//     }
// })

// router.put("/edit/:id", authenticate(), (req,res) => {
//     console.log(req.params.id)
//     update(Number(req.params.id), req.body)
//         .then(res.status(200).json({message: "Post edited sucessfully!"}))
//     .catch(err => {
//         console.log(err)
//         res.status(401).json({message: err})
//     })
// })

// router.delete("/:id", authenticate() ,(req,res) => {
//     remove(Number(req.params.id))
//     .then(res.status(200).json({message: "post has been deleted"}))
//     .catch(err => {
//         console.log(err)
//         res.status(404).json({message: "post not found"})
//     })
// })



// module.exports = router