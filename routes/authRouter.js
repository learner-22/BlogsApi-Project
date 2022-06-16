const express =require('express')

const userModel = require('../models/userSchema')

//Create a Router
const router = express.Router()

const {check, validationResult} = require( 'express-validator')
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
//Create a new user

router.post('/registration',[
    check('username', 'Enter a valid alphanumeric username').trim().notEmpty().isAlphanumeric(),
    check('email','Please enter a valid email format').trim().notEmpty().isEmail(),
    check('password', 'Please enter a password with 8 or more characters').trim().isLength({min:8}),
    check('age','Age needs to be numeric and greater than 13').trim().isInt({min :13}),
    check('birthday', 'Enter valid Birthday').isDate()
], async(req,res)=>{
    const userData =req.body // getting the data from the request

   //Check for Validation Errors
   const errors=validationResult(req)
   
   if(!errors.isEmpty()){
       return res.json(errors.array())
   }
   
    try {
      
        //Validate if the email already exist in DB
  const userExist =await userModel.findOne({email:userData.email})
  //Return this msg if exists
   if(userExist){
     return res.json({msg: 'User already exist'})
   }
 
   // 1 Create the salt
   const SALT = await bcrypt.genSalt(10)
   // 2 use the salt to create a hash with the user's password
   const hashedPassword = await bcrypt.hash(userData.password, SALT)
   // 3 assign the hashed password to the userData
   userData.password = hashedPassword
 
        const user = await userModel.create(userData) 

        //Create a new JWT token
        const payload= {
              id: user._id,
              email: user.email
             }
  
         const TOKEN = jwt.sign(payload, process.env.SECRET_KEY)
       //send back the response
       res.status(201).json({
        user :user,
        token:TOKEN
      })
    } catch (error) {
        console.error(error)
        res.status(400).json('Bad Request!')
    }
})

router.post('/login',[
    check("email","pleases provide a valid email").trim().isEmail(),
    check("password","Check your password").trim().notEmpty()
],async(req,res)=>{
    const userData = req.body

    //Check for Validation Errors
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.json(errors.array())
    }    
    try {
        //Find the user with the provided email
        const user = await userModel.findOne({email : userData.email})
        if(!user){
            return res.json('User not found')
        }

        //compare plain text password to hashed password
        const isMatch = await bcrypt.compare(userData.password, user.password)

        if(!isMatch){
            return res.json('Password is not a match')
        }

//Create a new JWT token
const payload= {
    
    id: user._id,
    email: user.email
  }
  
  const TOKEN = jwt.sign(payload, process.env.SECRET_KEY)
  
      res.status(201).json({
        msg: 'Login Sucessful',
        user :user,
        token:TOKEN
      })

      // res.status(200).json('Login Success!')
    } catch (error) {
        console.log(error)
        res.status(500).json('Server Error')
    }

})


module.exports = router