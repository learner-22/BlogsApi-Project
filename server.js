
//Setup Express and PORT
const express= require('express')
const app= express()
// Heroku sets up the port else when we run locally, we use 4000
//The PORT variable is kept empty
PORT = process.env.PORT || 4000

//Initiate the dotenv config 
require('dotenv').config() 
const mongoConfig = require('./config/mongoConfig')

//Initiate Morgan -
const morgan = require('morgan')
app.use(morgan('dev'))

//Initiate Helmet
const helmet = require('helmet')
app.use(helmet())



//Middleware
app.use(express.json())

//Setup the route for Blogs
const blogsRouter = require('./routes/blogRouter')
app.use('/blogs', blogsRouter)
const authRouter = require('./routes/authRouter')
app.use('/auth', authRouter)
const userRouter = require('./routes/userRouter')
app.use('/users', userRouter)

//Setup the Root Route
app.get('/',(req,res)=>{
   
    res.status(200).json("Welcome to Blogs API Project")
})

//Listen to the port
app.listen(PORT,()=>{
    console.log(`Server is running on port :${PORT}`)
    mongoConfig()
    
})