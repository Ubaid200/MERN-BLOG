import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import Authroutes from "./routes/Auth.route.js";
import Userroute from "./routes/User.route.js";
import CategoryRoute from "./routes/Category.route.js";
import blogroute from "./routes/Blogroute.js";
import CommentRoute from "./routes/CommentRoute.js";
import LikeRoute from "./routes/LikeRoute.js";
dotenv.config()

const app = express()
const PORT = process.env.PORT
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use('/auth',Authroutes)
app.use('/api',Userroute)
app.use('/category',CategoryRoute)
app.use('/blog',blogroute)
app.use('/api/comment',CommentRoute)
app.use('/api/like',LikeRoute)
app.use("/uploads", express.static("uploads"))

connectDB()


app.listen(PORT, () => {
    console.log("port is running :", PORT);

})
app.use((err,req,res,next)=>{
    const statuscode = err.statuscode
    const message = err.message
    res.status(statuscode).json({
        success:false,
        statuscode,
        message
    })
})