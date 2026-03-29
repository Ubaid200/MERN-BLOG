import express from "express"
import  { addLike, getLike } from "../controller/LikeController.js";
import { authmiddleware } from "../helper/middleware.js";
const LikeRoute = express.Router();

LikeRoute.post('/addlike',authmiddleware,addLike)
LikeRoute.get('/getlike/:blogid',getLike)

export default LikeRoute;