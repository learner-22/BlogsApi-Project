//Import Mongoose

const mongoose = require('mongoose')

//Create the blogs Schema
//Added user key to store the user id of the user who created the blog
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
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref :'Users'
                      
        }
    }
)

//Creates a Model of the name Blogs using the blogSchema

module.exports =mongoose.model('Blogs', blogSchema)