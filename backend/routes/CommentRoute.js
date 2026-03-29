import express from "express"
import { addComment, delcomment, getallcomment, getcomment } from "../controller/CommentController.js";
import { authmiddleware } from "../helper/middleware.js";
const CommentRoute = express.Router();

CommentRoute.post('/add',authmiddleware,addComment)
CommentRoute.get('/get/:blogid',getcomment)
CommentRoute.get('/get-all',authmiddleware,getallcomment)
CommentRoute.delete('/delete/:commentid',authmiddleware,delcomment)

export default CommentRoute;