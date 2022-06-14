const express =require('express')

const userModel = require('../models/userSchema')

//Create a Router
const router = express.Router()


//Get all Users
router.get('/', async(req,res)=>{
  
    try {
        const users = await userModel.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
    }

})

//Update Users

router.put('/:id', async(req,res)=>{

    const id =req.params.id
    const newUserData = req.body
    try {
        //Find the user by id and update with the new values 
    const user = await userModel.findByIdAndUpdate( id, newUserData,{new:true})
    res.status(202).json(user)
    } catch (error) {
        console.log(error)
    }
    
})

//Delete user

router.delete('/:id', async(req,res)=>{
    const id =req.params.id
    try {
        const user = await userModel.findByIdAndDelete(id)
        res.status(200).json('User Deleted')
    } catch (error) {
        console.log(error)
    }
})
module.exports =router