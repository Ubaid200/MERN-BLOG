import Comment from "../models/Comments.js"
export const addComment = async(req,res)=>{
    try {
        const {author,blogid,comment} = req.body
        const newComment = new Comment({
            author,blogid,comment
        })
        newComment.save()
        res.status(200).json({
            message:"successfully Comment submit",
            comment:newComment
        })
    } catch (error) {
      res.status(500).json({message:error.message})  
    }
}
export const getcomment = async(req,res)=>{
    try {
        const {blogid} = req.params
        const comments = await Comment.find({blogid}).populate("author","name avatar").sort({createdAt: -1}).lean().exec()

       
        res.status(200).json({
           comments
        })
    } catch (error) {
      res.status(500).json({message:error.message})  
    }
}
export const getallcomment = async(req,res)=>{
    try {
         const comments = await Comment.find().populate('blogid','title').populate('author','name')

       
        res.status(200).json({
           comments
        })
    } catch (error) {
      res.status(500).json({message:error.message})  
    }
}
export const delcomment = async(req,res)=>{
    try {
        const {commentid} = req.params
         const comments = await Comment.findByIdAndDelete(commentid)

       
        res.status(200).json({
           success:comments,
           message:"successfully delete comment"
        })
    } catch (error) {
      res.status(500).json({message:error.message})  
    }
}