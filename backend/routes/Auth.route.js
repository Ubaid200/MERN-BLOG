import express from "express"
import { Login, Logout, Registor } from "../controller/authController.js";
import { authmiddleware } from "../helper/middleware.js";
const Authroutes = express.Router();

Authroutes.post('/signup',Registor)
Authroutes.post('/signin',Login)
Authroutes.post('/logout',authmiddleware,Logout)

export default Authroutes;