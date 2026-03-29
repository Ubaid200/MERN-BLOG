import mongoose from "mongoose";
const LikeShema = mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    blogid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Blog'
    },
   
  
    
},{timestamps:true})
const Like = mongoose.model('Like',LikeShema)
export default Like;