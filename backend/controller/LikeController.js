import Like from "../models/LikeModel.js"
export const addLike = async(req,res) =>{
  try {
      const {userid,blogid} = req.body
    const existLike = await Like.findOne({userid,blogid})
    if(existLike){
        await Like.deleteOne({userid,blogid})
         return res.json({ message: "Unliked" });
    }
      await Like.create({ userid, blogid });
      res.json({ message: "Liked" });
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}
export const getLike = async(req,res)=>{
   try {
     const {blogid} = req.params
      let isLiked = false 
    const likecount = await Like.countDocuments({blogid})
   if(likecount > 0){
    isLiked = true
   }
    res.status(200).json({likecount,isLiked})

   } catch (error) {
    res.status(500).json({message:error.message})
   }
}