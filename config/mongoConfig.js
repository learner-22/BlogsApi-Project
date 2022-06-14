//Initialize Mongoose
const mongoose = require('mongoose')

//Setup the connection with MongoDB
module.exports = async () =>{
    try {
        //Make a connection with mongoDB
        await mongoose.connect(process.env.MONGODB_URI) 
        mongoose.connection //checking the connection
        console.log('MongoDB Connected')
    } catch (error) {
        console.error(error)
    }
}