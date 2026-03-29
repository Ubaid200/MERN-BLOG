import { handleError } from "../helper/handleError.js"
import User from "../models/User.js"
import bcrypt from "bcrypt"

export const getuser = async (req,res,next)=>{
    try {
        const {userid} = req.params
        const user = await User.findById(userid).lean()

        if(!user){
          return  next(handleError(404,"user not found"))
        }
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}
export const profileupdate = async (req,res)=>{
    try {
       const {userid} = req.params;
       const userdata = req.body;
       if (!userdata.password || userdata.password.trim() === "") {
      delete userdata.password
    } else {
      const hash = await bcrypt.hash(userdata.password.trim(), 10)
      userdata.password = hash
    }
      const updatedUser = await User.findByIdAndUpdate(userid, userdata, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({message: "Successfull update"})

    } catch (error) {
            res.status(500).json({ message: 'Server error' });
    }
}
export const getalluser = async (req,res) =>{
  try {
         const alluser = await User.find().select("-password") .sort({createdAt:-1})
       res.status(200).json({
        success:true,
        user:alluser
       })
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}
export const deluser = async(req,res)=>{
  try {
    const {delid} = req.params
    await User.findByIdAndDelete(delid)
    res.status(200).json({
      success:true,
      message:"successfull delete users"
    })
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}