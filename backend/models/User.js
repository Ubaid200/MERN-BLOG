import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    role:{
        type: String,
        default:'user',
        enum: ['user','admin'],
        required:true,
        trim:true
    },
    name:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        unique:true,
        required:true,
        trim:true
    },
    bio:{
        type: String,
        trim:true
    },
    avatar:{
        type: String,
        trim:true
    },
    password:{
        type: String,
        trim:true
    },
})
const User = mongoose.model('User',userSchema)
export default User;