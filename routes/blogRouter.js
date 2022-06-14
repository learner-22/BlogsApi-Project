const express =require('express')

const blogModel = require('../models/blogSchema')

//Create a Router
const router = express.Router()

//Get the middleware for token authorisation
const authMiddleware =require('../middleware/authMiddleware')

// Get Blogs
router.get('/',authMiddleware, async(req,res) =>{
 
    try {
  const blogs = await blogModel.find()
  res.status(200).json(blogs)
    
} catch (error) {
    console.log(error)
}

})

// Create Blogs
router.post('/',authMiddleware,async(req,res)=>{
    const blogData =req.body // getting the data from the request
    try {
        
        const blog = await blogModel.create(blogData) // Create the todo in the Database
       //send back the response
        res.status(201).json(blog)
    } catch (error) {
        console.error(error)
        res.status(400).json('Bad Request!')
    }

})

// Get blogs by Id
router.get('/:id',authMiddleware,async(req,res)=>{
    const id = req.params.id
    try {
        const blog = await blogModel.findById(id)
        res.status(200).json(blog)
    } catch (error) {
        console.error(error)
        res.status(400).json({msg: 'ID not found'})
    }

})

// Update blogs by ID

router.put('/:id',authMiddleware,async(req,res)=>{
    const id = req.params.id
    const newblogData = req.body
    try {
        
        //find the blog by id
        const blog = await blogModel.findByIdAndUpdate(id, newblogData,{new:true})
        res.status(202).json(blog)
    } catch (error) {
        console.log(error)
    }
})

// Delete a Todo
router.delete('/:id',authMiddleware, async(req,res) => {

    const id = req.params.id
    try {
        const blog =  await blogModel.findByIdAndDelete(id)
        res.status(200).json({msg :'Blog was deleted'})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router