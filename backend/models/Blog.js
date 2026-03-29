import mongoose from "mongoose";
const BlogShema = mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Category'
    },
    title:{
        type: String,
        required:true,
        trim:true
    },
    slug:{
        type: String,
        unique:true,
        required:true,
        trim:true
    },
    content:{
        type: String,
        required:true,
        trim:true
    },
    featureImage:{
        type: String,
        required:true,
        trim:true
    },

    
},{timestamps:true})
const Blog = mongoose.model('Blog',BlogShema)
export default Blog;