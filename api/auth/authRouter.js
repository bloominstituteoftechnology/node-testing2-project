const express = require('express');
const dbConfig = require('../../data/dbConfig');
const router = express.Router();
//imports
const userModel = require('../../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const secrets = require('../../config/secrets');

//exports
module.exports = router;

//endpoints

    //POST - registsers a new user

    router.post('/register', async (req, res, next)=>{
        try{
            const newUser = await (req.body);
            const hash = bcrypt.hashSync(newUser.password, 12)
            
            newUser.Password = hash
            await userModel.insert(newUser)
            .then(resolve=>{
                res.json({message: 'Welcome User',
                    newUser: newUser})
            })
            .catch(err=>{
                res.status(500).json({message: `Could not register, user already exists.`})
            })
        }
        
        catch (err){
            next(err);
            res.status(400).json({
                message: `Could not register new user.`,
                err: err
            })
        }
    })

    //POST - Logs user in

router.post('/', async (req, res, next )=>{
    
    const { username, password } = req.body;
    let user = await userModel.getBy({username})
    let passwordsMatch = await bcrypt.compareSync(password, user[0].password)
    
    if(user.length !== 0 && passwordsMatch){
        req.session.user = user[0];
        req.session.token = generateToken(user);

        res.status(200).json(req.session)
    }else{
        res.status(401).json({message: `You are not authorized`})
    }

});

    //GET - Logs user out
router.get('/logout', async (req, res)=>{

    req.session.destroy(err=>{
        if(err){
            res.status(200).json({err: err})
        }else{
            res.status(200).json({message: `Session destroyed, user has been logged out.`})
        }
    })
})
    


//Token Generator
function generateToken(user) {
    const payload = {
      subject: user.id, // sub in payload is what the token is about
      username: user.username,
      department: user.department
      // ...otherData
    };
  
    const options = {
      expiresIn: '1d', // show other available options in the library's documentation
    };
  
    // extract the secret away so it can be required and used where needed
    return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
  }