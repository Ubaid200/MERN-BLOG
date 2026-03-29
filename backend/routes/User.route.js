import express from "express"
import { deluser, getalluser, getuser, profileupdate } from "../controller/User.controller.js"
import { authmiddleware } from "../helper/middleware.js"
const Userroute = express.Router()
Userroute.use(authmiddleware)
Userroute.get('/get-user/:userid',getuser)
Userroute.put("/update/:userid",profileupdate)
Userroute.get("/getalluser",getalluser)
Userroute.delete("/user-delete/:delid",deluser)
export default Userroute