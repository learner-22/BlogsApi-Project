
//Import Mongoose
const mongoose = require('mongoose')

//Create Users Schema
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    birthday:{
        type:Date,
        required:true
    },
    age:{
        type:Number,

    },
    password:{
        type:String,
        required:true
    }
})

//Creates a Model of the name Users using the userSchema
module.exports = mongoose.model ('Users', userSchema)