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

// Get only blogs that are not private - private is false
router.get('/public',authMiddleware, async(req,res) =>{
 
    try {
  const blogs = await blogModel.find({private: 'false'})
  res.status(200).json(blogs)
    
} catch (error) {
    console.log(error)
}

})
// Create Blogs
router.post('/',authMiddleware,async(req,res)=>{
   
    const blogData =req.body // getting the data from the request
   //Assigning the user id of the user who created the blog
    blogData.user = req.user.id
    console.log(blogData)
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
        const  blogToUpdate= await blogModel.findById(id)
        console.log('User who created Blog -- ' + blogToUpdate.user) 
        console.log('User who logged In -- ' + req.user.id)
        //Making sure that the user who created the blog can only modify it
    if(blogToUpdate.user._id.toString() !== req.user.id )
       {
        return res.status(400).json("Not Authorized to Update the Blog")
      }
        //find the blog by id
        const blog = await blogModel.findByIdAndUpdate(id, newblogData,{new:true})
        res.status(202).json({Message : 'Blog Updated', Blog : blog})
    } catch (error) {
        console.log(error)
    }
})

// Delete a Todo
router.delete('/:id',authMiddleware, async(req,res) => {

    const id = req.params.id

    try {
       
        const blogToDelete = await blogModel.findById(id) 

         //Making sure that the user who created the blog can only delete it
        console.log('User who created Blog -- ' + blogToDelete.user) 
        console.log('User who logged In -- ' + req.user.id)
    if(blogToDelete.user._id.toString() !== req.user.id )
       {
        return res.status(400).json("Not Authorized to Delete")
      }

        const blog =  await blogModel.findByIdAndDelete(id)
        res.status(200).json({msg :'Blog was deleted'})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router