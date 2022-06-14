//Import Mongoose

const mongoose = require('mongoose')

//Create the blogs Schema
const blogSchema = mongoose.Schema(
    {
        created_by : {
            type:String,
            required:true
        },
        created_at :{
            type :Date,
            default:Date.now(),
            required:true
        },
        blog_title : {
            type :String,
            required:true
        },
        blog_content :{
            type: String,
            required: true
        },
        private :{
            type: Boolean,
            required : true
        },
    }
)

//Creates a Model of the name Blogs using the blogSchema

module.exports =mongoose.model('Blogs', blogSchema)